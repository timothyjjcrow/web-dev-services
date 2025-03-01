// src/components/Services/Services.js
import React, { useState } from "react";
import { Row, Col, Typography, Button, Tabs } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  CodeOutlined,
  ShoppingOutlined,
  ToolOutlined,
  RightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { services } from "../../data/servicesData";
import "./Services.css";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const Services = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.03,
      color: "#26d0ce",
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Generate all particles with randomized properties
  const renderParticles = () => {
    const particleCount = 15; // Adjust based on desired density
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const size = 3 + Math.random() * 6;
      const opacity = 0.2 + Math.random() * 0.5;
      const animationDuration = 7 + Math.random() * 15;
      const delay = Math.random() * 5;
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      particles.push(
        <div
          key={i}
          className="service-particle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDuration: `${animationDuration}s`,
            animationDelay: `${delay}s`,
            top: `${top}%`,
            left: `${left}%`,
          }}
        />
      );
    }

    return particles;
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const renderServiceTabs = () => {
    return (
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        className="service-tabs"
        tabPosition="left"
        tabBarStyle={{
          width: "250px",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {services.map((service, index) => (
          <TabPane
            tab={
              <motion.div
                className="service-tab"
                initial={{ opacity: 0.7 }}
                animate={{
                  opacity: activeTab === index.toString() ? 1 : 0.7,
                  x: activeTab === index.toString() ? 10 : 0,
                }}
                whileHover={{ opacity: 1, x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="service-tab-icon">
                  {index === 0 ? (
                    <CodeOutlined />
                  ) : index === 1 ? (
                    <ShoppingOutlined />
                  ) : (
                    <ToolOutlined />
                  )}
                </div>
                <div className="service-tab-text">
                  <Text className="service-tab-title">{service.title}</Text>
                  <Text className="service-tab-desc">
                    {service.description.substring(0, 40)}...
                  </Text>
                </div>
              </motion.div>
            }
            key={index.toString()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="service-content"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                variants={tabVariants}
              >
                <Row gutter={[40, 40]}>
                  <Col xs={24} md={14} className="service-detail-content">
                    <Title level={3} className="service-detail-title">
                      {service.title}
                    </Title>
                    <div className="service-title-underline"></div>

                    <Paragraph className="service-detail-description">
                      {service.details}
                    </Paragraph>

                    <div className="service-features">
                      <Title level={4} className="features-title">
                        Key Features
                      </Title>
                      <div className="features-list">
                        {service.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            className={`feature-item ${
                              hoveredFeature === i ? "hovered" : ""
                            }`}
                            custom={i}
                            variants={featureVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            onHoverStart={() => setHoveredFeature(i)}
                            onHoverEnd={() => setHoveredFeature(null)}
                          >
                            <CheckCircleOutlined className="feature-icon" />
                            <Text className="feature-text">{feature}</Text>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="service-tech">
                      <Title level={5} className="tech-title">
                        Technologies:
                      </Title>
                      <div className="tech-logos">
                        {service.logos.map((logo, i) => (
                          <div key={i} className="tech-logo-item">
                            <motion.div
                              whileHover={{ scale: 1.1, y: -5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <span className="tech-name">{logo.name}</span>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      className="service-cta"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="primary"
                        size="large"
                        className="service-button"
                      >
                        Get Started <RightOutlined />
                      </Button>
                    </motion.div>
                  </Col>

                  <Col xs={24} md={10} className="service-image-col">
                    <motion.div
                      className="service-image-wrapper"
                      variants={imageVariants}
                    >
                      <div className="service-image-container">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="service-detail-image"
                        />
                        <div className="image-overlay"></div>
                        <div className="image-glow"></div>
                      </div>
                    </motion.div>

                    <div className="image-decoration">
                      <div className="deco-circle"></div>
                      <div className="deco-line"></div>
                    </div>
                  </Col>
                </Row>
              </motion.div>
            </AnimatePresence>
          </TabPane>
        ))}
      </Tabs>
    );
  };

  return (
    <section className="services-section" id="services">
      <div className="services-background">
        <div className="services-overlay"></div>
        <div className="services-particles">{renderParticles()}</div>
      </div>

      <motion.div
        className="services-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={sectionVariants}
      >
        <motion.div className="section-header" variants={headerVariants}>
          <Title level={2} className="services-title">
            Our Services
          </Title>
          <Paragraph className="services-description">
            We deliver comprehensive web development solutions tailored to
            elevate your online presence and drive business growth.
          </Paragraph>
          <div className="services-divider">
            <span className="services-divider-dot"></span>
            <span className="services-divider-line"></span>
            <span className="services-divider-dot"></span>
          </div>
        </motion.div>

        <div className="services-tabs-container">{renderServiceTabs()}</div>
      </motion.div>

      <div className="service-wave-container">
        <svg
          className="service-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Services;
