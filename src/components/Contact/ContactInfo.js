// src/components/Contact/ContactInfo.js
import React from "react";
import { Card, Typography, List } from "antd";
import { motion } from "framer-motion";
import SocialIcons from "./common/SocialIcons";
import { contactInfo, socialLinks } from "../../data/contactData";

const { Title } = Typography;

const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100%" }}
    >
      <Card className="contact-info-card">
        <Title level={3}>Contact Information</Title>
        <List
          itemLayout="horizontal"
          className="contact-info-list"
          dataSource={contactInfo}
          renderItem={(item, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            </motion.div>
          )}
        />

        <motion.div
          className="social-links"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Title level={4}>Connect With Us</Title>
          <SocialIcons icons={socialLinks} size="large" />
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default ContactInfo;
