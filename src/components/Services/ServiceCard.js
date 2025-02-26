// src/components/Services/ServiceCard.js
import React from "react";
import { Card, Typography, List, Tooltip, Button } from "antd";
import {
  CheckCircleOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const ServiceCard = ({ service, isExpanded, index, onToggleExpand }) => {
  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.1,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const iconVariants = {
    initial: {
      scale: 0,
      rotate: -45,
    },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={isExpanded ? {} : "hover"}
      layoutId={`service-card-${index}`}
      className="service-card-wrapper"
    >
      <Card
        className={`service-card ${isExpanded ? "expanded" : ""}`}
        bodyStyle={{ padding: 0 }}
      >
        <div className="service-card-content">
          <div className="service-image-container">
            <motion.img
              layoutId={`service-image-${index}`}
              src={service.image}
              alt={service.title}
              className="service-image"
              whileHover={{ scale: isExpanded ? 1 : 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div className="service-image-overlay"></div>
            <motion.div
              className="service-card-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {/* You can add an icon here if desired */}
              <span className="service-badge-dot"></span>
            </motion.div>
          </div>

          <div className="service-card-body">
            <Title level={4} className="service-title" onClick={onToggleExpand}>
              {service.title}
              <motion.span
                className="service-expand-icon"
                initial="initial"
                animate="animate"
                variants={iconVariants}
              >
                {isExpanded ? <CloseOutlined /> : <ArrowRightOutlined />}
              </motion.span>
            </Title>

            <Paragraph className="service-description">
              {service.description}
            </Paragraph>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="service-details"
                  variants={detailsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={`service-details-${index}`}
                >
                  <Paragraph>{service.details}</Paragraph>

                  <div className="service-features">
                    <Title level={5} className="service-features-title">
                      Key Features
                    </Title>
                    <List
                      itemLayout="horizontal"
                      dataSource={service.features}
                      renderItem={(item, i) => (
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <List.Item className="service-feature-item">
                            <CheckCircleOutlined className="service-feature-icon" />
                            <Text className="service-feature-text">{item}</Text>
                          </List.Item>
                        </motion.div>
                      )}
                    />
                  </div>

                  <motion.div
                    className="service-technologies"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Title level={5} className="service-tech-title">
                      Technologies
                    </Title>
                    <div className="service-logos">
                      {service.logos.map((logo, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1, y: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Tooltip title={logo.name}>
                            <a
                              href={logo.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="service-logo"
                            >
                              <img src={logo.svg} alt={`${logo.name} logo`} />
                            </a>
                          </Tooltip>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="service-action"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button type="primary" className="service-cta-button">
                      Learn More
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!isExpanded && (
              <Button
                type="link"
                className="service-read-more"
                onClick={onToggleExpand}
              >
                Read More <ArrowRightOutlined />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
