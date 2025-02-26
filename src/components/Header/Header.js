// src/components/Header/Header.js
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { navLinks } from "../../data/navLinks";
import "./Header.css";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible =
        lastScrollPosition > currentScrollPos || currentScrollPos < 100;

      setMenuVisible(visible);
      setLastScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <AntHeader
      className={`header ${menuVisible ? "visible" : "hidden"}`}
      style={{ padding: "0 50px" }}
    >
      <motion.div
        className="logo"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Web Dev Services
      </motion.div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        {navLinks.map((item) => (
          <Menu.Item key={item.key}>
            <Link
              activeClass="active"
              to={item.to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              {item.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </AntHeader>
  );
};

export default Header;
