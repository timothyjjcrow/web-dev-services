// src/components/Services/Services.js
import React, { useState } from "react";
import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import "./Services.css";

const { Title, Paragraph } = Typography;

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const handleToggleExpand = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

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

  return (
    <section className="services-section" id="services">
      <div className="services-transition-top"></div>

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
            We offer comprehensive web development solutions tailored to your
            specific needs.
          </Paragraph>
          <div className="services-divider">
            <span className="services-divider-dot"></span>
            <span className="services-divider-line"></span>
            <span className="services-divider-dot"></span>
          </div>
        </motion.div>

        <Row gutter={[32, 32]} className="services-row">
          {services.map((service, index) => (
            <Col
              xs={24}
              md={12}
              lg={8}
              key={index}
              className="service-card-col"
            >
              <ServiceCard
                service={service}
                isExpanded={expandedService === index}
                index={index}
                onToggleExpand={() => handleToggleExpand(index)}
              />
            </Col>
          ))}
        </Row>
      </motion.div>

      <div className="service-wave-container">
        <svg
          className="service-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f5f5f5"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,197.3C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Services;
