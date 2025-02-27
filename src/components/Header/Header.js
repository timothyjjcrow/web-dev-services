// src/components/Header/Header.js
import React, { useState, useEffect, useCallback } from "react";
import { Layout, Button, Drawer } from "antd";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuOutlined,
  CloseOutlined,
  SendOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { navLinks } from "../../data/navLinks";
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Throttle function to limit scroll event firing
  const throttle = (callback, limit) => {
    let waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  };

  // Handle scroll behavior for header
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollPos = window.pageYOffset;

      // Show/hide based on scroll direction
      const visible =
        lastScrollPosition > currentScrollPos ||
        currentScrollPos < 100 ||
        mobileMenuOpen;

      // Add scrolled class when page is scrolled
      const scrolled = currentScrollPos > 50;

      setVisible(visible);
      setScrolled(scrolled);
      setLastScrollPosition(currentScrollPos);

      // Determine active section
      const sections = navLinks.map((link) => link.to);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveLink(section);
            break;
          }
        }
      }
    }, 100),
    [lastScrollPosition, mobileMenuOpen]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Toggle theme mode (functionality would need to be implemented)
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here you would implement the actual theme switching logic
  };

  // Logo animation variants
  const logoVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Nav animation variants
  const navVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <AntHeader
      className={`site-header ${visible ? "visible" : "hidden"} ${
        scrolled ? "scrolled" : ""
      }`}
    >
      <div className="header-container">
        <motion.div
          className="logo"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="logo-link"
          >
            <span className="logo-text">Web Dev Services</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="desktop-nav"
          initial="hidden"
          animate="visible"
          variants={navVariants}
        >
          <ul className="nav-links">
            {navLinks.map((item) => (
              <motion.li
                key={item.key}
                className={activeLink === item.to ? "active" : ""}
                variants={navItemVariants}
              >
                <Link
                  activeClass="active"
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onSetActive={() => setActiveLink(item.to)}
                >
                  {item.name}
                  <span className="link-underline"></span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="header-actions">
            {/* Optional Theme Toggler */}
            {/* <motion.div 
              className="theme-toggle"
              variants={navItemVariants}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
            >
              {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            </motion.div> */}

            <motion.div variants={navItemVariants}>
              <Button
                type="primary"
                className="contact-button"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="contact-button-icon">
                  <SendOutlined />
                </span>
                Get in Touch
              </Button>
            </motion.div>
          </div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className="mobile-menu-button"
              type="text"
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={toggleMobileMenu}
            />
          </motion.div>
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={closeMenu}
          open={mobileMenuOpen}
          className="mobile-menu-drawer"
          width={280}
          closeIcon={<CloseOutlined style={{ color: "white" }} />}
          headerStyle={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            color: "white",
          }}
          bodyStyle={{
            background: "linear-gradient(135deg, #000000 0%, #101020 100%)",
            padding: 0,
          }}
        >
          <ul className="mobile-nav-links">
            {navLinks.map((item) => (
              <li
                key={item.key}
                className={activeLink === item.to ? "active" : ""}
              >
                <Link
                  activeClass="active"
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={closeMenu}
                  onSetActive={() => setActiveLink(item.to)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="mobile-nav-button">
              <Button type="primary" block className="mobile-contact-button">
                <span className="mobile-contact-button-icon">
                  <SendOutlined />
                </span>
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  onClick={closeMenu}
                >
                  Get in Touch
                </Link>
              </Button>
            </li>
          </ul>
        </Drawer>
      </div>
    </AntHeader>
  );
};

export default Header;
