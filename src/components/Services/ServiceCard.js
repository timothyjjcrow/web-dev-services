import React from "react";
import { Card, Typography, Divider, List, Tooltip } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";

const { Title, Paragraph } = Typography;

const ServiceCard = ({ service, isExpanded, index, onToggleExpand }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Card
        hoverable
        className={`service-card ${isExpanded ? "expanded" : ""}`}
        style={{ height: "100%" }}
        cover={
          <div className="service-image-container">
            <img
              alt={service.title}
              src={service.image}
              className="service-image"
            />
          </div>
        }
        onClick={onToggleExpand}
      >
        <Card.Meta
          title={<Title level={4}>{service.title}</Title>}
          description={service.description}
        />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="service-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Divider />
              <Paragraph>{service.details}</Paragraph>

              <Title level={5}>Key Features:</Title>
              <List
                itemLayout="horizontal"
                dataSource={service.features}
                renderItem={(item, i) => (
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <CheckCircleOutlined style={{ color: "#1890ff" }} />
                        }
                        title={item}
                      />
                    </List.Item>
                  </motion.div>
                )}
              />

              <motion.div
                className="service-technologies"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Title level={5}>Technologies:</Title>
                <div className="service-logos">
                  {service.logos.map((logo, i) => (
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      key={i}
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
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
