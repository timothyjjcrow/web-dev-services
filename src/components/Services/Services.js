// src/components/Services/Services.js
import React, { useState } from "react";
import { Row, Col, Typography, Button, Card } from "antd";
import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import { services } from "../../data/servicesData";
import "./Services.css";

const { Title, Paragraph, Text } = Typography;

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: i * 0.1,
      },
    }),
  };

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <motion.div
          className="services-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          {/* Section Header */}
          <motion.div className="services-header" variants={headerVariants}>
            <Title level={2} className="services-title">
              Our Services
            </Title>
            <Paragraph className="services-description">
              We deliver comprehensive web development solutions tailored to
              elevate your online presence and drive business growth.
            </Paragraph>
            <div className="services-divider"></div>
          </motion.div>

          {/* Services Cards */}
          <Row gutter={[32, 32]} className="services-cards-row">
            {services.map((service, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  custom={index}
                  variants={cardVariants}
                  onHoverStart={() => !isMobile && setHoveredCard(index)}
                  onHoverEnd={() => !isMobile && setHoveredCard(null)}
                  className="service-card-container"
                >
                  <Card
                    className={`service-card ${
                      hoveredCard === index ? "hovered" : ""
                    }`}
                    cover={
                      <div className="service-image-wrapper">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="service-image"
                        />
                        <div className="service-image-overlay"></div>
                      </div>
                    }
                  >
                    <Title level={4} className="service-title">
                      {service.title}
                    </Title>
                    <Paragraph className="service-description">
                      {service.description}
                    </Paragraph>

                    <div className="service-features">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="service-feature">
                          <div className="feature-dot"></div>
                          <Text className="feature-text">{feature}</Text>
                        </div>
                      ))}
                    </div>

                    <div className="service-footer">
                      <Button type="primary" className="service-btn">
                        Learn More <ArrowRightOutlined />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
