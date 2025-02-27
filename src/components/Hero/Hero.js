// src/components/Hero/Hero.js
import React, { useEffect, useRef } from "react";
import { Typography, Button, Row, Col } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  RocketOutlined,
  ArrowRightOutlined,
  CodeOutlined,
  MobileOutlined,
  ShopOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./Hero.css";

const { Title, Paragraph } = Typography;

const Hero = () => {
  const heroRef = useRef(null);

  // Parallax effect on mouse move for the shapes
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const shapes = heroRef.current.querySelectorAll(".hero-shape");
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      shapes.forEach((shape, index) => {
        // Different movement intensity for each shape
        const offsetX = (mouseX - 0.5) * (index + 1) * 20;
        const offsetY = (mouseY - 0.5) * (index + 1) * 20;
        shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const techIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.8 + i * 0.1,
      },
    }),
  };

  return (
    <section className="hero-section" id="home" ref={heroRef}>
      {/* Decorative shapes */}
      <div className="hero-shape-container">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
        <div className="hero-shape shape-4"></div>

        {/* Animated code lines */}
        <div className="code-lines">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="code-line"
              style={{
                width: `${Math.random() * 40 + 30}%`,
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 40}%`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <Row className="hero-container">
        <Col xs={24} md={14} lg={12} className="hero-content-col">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-tag">
              <span className="hero-tag-icon">⚡</span>
              <span>Modern Web Development Solutions</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Title className="hero-title">
                Transform Your <span className="highlight">Digital</span>{" "}
                Presence
              </Title>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Paragraph className="hero-description">
                We craft exceptional web experiences that blend stunning design
                with cutting-edge technology to help your business stand out in
                the digital landscape.
              </Paragraph>
            </motion.div>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<RocketOutlined />}
                  className="hero-button primary"
                >
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Start Your Project
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="large"
                  className="hero-button secondary"
                  icon={<ArrowRightOutlined />}
                >
                  <Link
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Explore Services
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div className="hero-tech-icons" variants={itemVariants}>
              <div className="tech-icons-label">Technologies we master:</div>
              <div className="tech-icons-container">
                {[
                  { icon: <CodeOutlined />, label: "React" },
                  { icon: <MobileOutlined />, label: "Responsive" },
                  { icon: <ShopOutlined />, label: "payment" },
                  { icon: <GlobalOutlined />, label: "Web Apps" },
                ].map((tech, i) => (
                  <motion.div
                    className="tech-icon"
                    key={i}
                    custom={i}
                    variants={techIconVariants}
                  >
                    {tech.icon}
                    <span>{tech.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </Col>

        <Col xs={24} md={10} lg={12} className="hero-image-col">
          <motion.div
            className="hero-image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="hero-image">
              <div className="hero-device laptop">
                <div className="device-screen">
                  <div className="screen-content">
                    <div className="content-item"></div>
                    <div className="content-item"></div>
                    <div className="content-item"></div>
                  </div>
                </div>
              </div>
              <div className="hero-device phone">
                <div className="device-screen">
                  <div className="screen-content">
                    <div className="content-item"></div>
                    <div className="content-item"></div>
                  </div>
                </div>
              </div>
              <div className="hero-device tablet">
                <div className="device-screen">
                  <div className="screen-content">
                    <div className="content-item"></div>
                    <div className="content-item"></div>
                    <div className="content-item"></div>
                  </div>
                </div>
              </div>
              <div className="hero-orbit">
                <div className="orbit-circle"></div>
              </div>
            </div>
          </motion.div>
        </Col>
      </Row>

      <div className="hero-bottom-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,288L48,277.3C96,267,192,245,288,229.3C384,213,480,203,576,213.3C672,224,768,256,864,261.3C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="floating-particles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
