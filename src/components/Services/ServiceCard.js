// src/components/Services/ServiceCard.js
import React, { useState } from "react";
import { Card, Typography, List, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="service-card-wrapper"
    >
      <motion.div
        className="service-card-container"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -10 : 0,
          height: "auto",
          transition: { duration: 0.3 },
        }}
      >
        <Card
          className={`service-card ${isHovered ? "hovered" : ""}`}
          cover={
            <div className="service-image-container">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <div className="service-image-overlay"></div>
              <span className="service-badge" />
            </div>
          }
        >
          <Title level={4} className="service-title">
            {service.title}
          </Title>

          <Paragraph className="service-description">
            {service.description}
          </Paragraph>

          <div className="service-tech-preview">
            {service.logos.map((logo, i) => (
              <Tag key={i} className="service-tech-tag">
                {logo.name}
              </Tag>
            ))}
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="service-hover-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Paragraph className="service-expanded-description">
                  {service.details}
                </Paragraph>

                <div className="service-features-preview">
                  <Text strong className="features-title">
                    Key Features:
                  </Text>
                  <List
                    size="small"
                    dataSource={service.features}
                    renderItem={(item) => (
                      <List.Item className="service-feature-item">
                        <CheckOutlined className="service-feature-icon" />
                        <Text className="service-feature-text">{item}</Text>
                      </List.Item>
                    )}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
