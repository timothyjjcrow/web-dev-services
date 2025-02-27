// src/components/Header/Header.js
import React, { useState, useEffect } from "react";
import { Layout, Button, Drawer } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { navLinks } from "../../data/navLinks";
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible =
        lastScrollPosition > currentScrollPos || currentScrollPos < 100;

      setVisible(visible);
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AntHeader className={`site-header ${visible ? "visible" : "hidden"}`}>
      <div className="header-container">
        <motion.div
          className="logo"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-text">Web Dev Services</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
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
                  onSetActive={() => setActiveLink(item.to)}
                >
                  {item.name}
                  <span className="link-underline"></span>
                </Link>
              </li>
            ))}
          </ul>
          <Button type="primary" className="contact-button">
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Get in Touch
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          className="mobile-menu-button"
          type="text"
          icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          onClick={toggleMobileMenu}
        />

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
