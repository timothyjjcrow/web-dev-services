// src/components/Hero/Hero.js
import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { RocketOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./Hero.css";

const { Title, Paragraph } = Typography;

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <section className="hero-section" id="home">
      {/* Gradient overlay */}
      <div className="hero-overlay"></div>

      {/* Animated background elements */}
      <div className="hero-background">
        <div className="hero-circles">
          <div className="hero-circle circle-1"></div>
          <div className="hero-circle circle-2"></div>
          <div className="hero-circle circle-3"></div>
        </div>

        <div className="hero-grid"></div>

        {/* Animated particles for visual interest */}
        <div className="hero-particles">
          {[...Array(isMobile ? 8 : 15)].map((_, index) => (
            <div
              key={index}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <Row align="middle" className="hero-row">
          <Col xs={24} md={12} className="hero-content-col">
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="hero-badge">
                <span>Web Development Solutions</span>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Title className="hero-title">
                  Transform Your <span className="highlight">Digital</span>{" "}
                  Presence
                </Title>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Paragraph className="hero-description">
                  We build exceptional web experiences that combine stunning
                  design with cutting-edge technology to help your business
                  stand out in the digital landscape.
                </Paragraph>
              </motion.div>

              <motion.div className="hero-buttons" variants={itemVariants}>
                <Button
                  type="primary"
                  className="hero-button primary"
                  icon={<RocketOutlined />}
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

                <Button
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
                    Our Services
                  </Link>
                </Button>
              </motion.div>

              {/* Tech tags */}
              <motion.div className="hero-tech-tags" variants={itemVariants}>
                <div className="tech-tag">React</div>
                <div className="tech-tag">Vue</div>
                <div className="tech-tag">Node.js</div>
                <div className="tech-tag">Shopify</div>
                <div className="tech-tag">WordPress</div>
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={24} md={12} className="hero-image-col">
            <motion.div
              className="hero-image-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="hero-image-container">
                <div className="hero-image-screen">
                  <div className="hero-code-container">
                    {/* UI elements: Code window mockup */}
                    <div className="code-header">
                      <div className="code-buttons">
                        <span className="code-button"></span>
                        <span className="code-button"></span>
                        <span className="code-button"></span>
                      </div>
                      <div className="code-title">index.js</div>
                    </div>
                    <div className="code-editor">
                      <div className="code-line">
                        <span className="code-keyword">import</span> React{" "}
                        <span className="code-keyword">from</span>{" "}
                        <span className="code-string">'react'</span>;
                      </div>
                      <div className="code-line">
                        <span className="code-keyword">import</span>{" "}
                        <span className="code-string">'./App.css'</span>;
                      </div>
                      <div className="code-line"></div>
                      <div className="code-line">
                        <span className="code-keyword">function</span>{" "}
                        <span className="code-function">App</span>() {`{`}
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-keyword">return</span> (
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-tag">{`<div className="app">`}</span>
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-tag">{`<header>`}</span>
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-tag">{`<h1>`}</span>Welcome
                        <span className="code-tag">{`</h1>`}</span>
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-tag">{`</header>`}</span>
                      </div>
                      <div className="code-line">
                        {" "}
                        <span className="code-tag">{`</div>`}</span>
                      </div>
                      <div className="code-line"> );</div>
                      <div className="code-line">{`}`}</div>
                      <div className="code-line"></div>
                      <div className="code-line">
                        <span className="code-keyword">export default</span>{" "}
                        App;
                      </div>
                    </div>
                  </div>
                </div>

                <div className="devices">
                  <div className="device tablet">
                    <div className="device-screen"></div>
                  </div>
                  <div className="device phone">
                    <div className="device-screen"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Wave separator */}
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,165.3C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
