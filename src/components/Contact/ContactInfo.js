// src/components/Contact/ContactInfo.js
import React from "react";
import { Typography, List } from "antd";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

// Contact info data
const contactInfo = [
  {
    icon: <MailOutlined className="contact-icon" />,
    title: "Email",
    description: "info@webdevservices.com",
    link: "mailto:info@webdevservices.com",
  },
  {
    icon: <PhoneOutlined className="contact-icon" />,
    title: "Phone",
    description: "(123) 456-7890",
    link: "tel:+1234567890",
  },
  {
    icon: <ApartmentOutlined className="contact-icon" />,
    title: "Address",
    description: "123 Web Dev Street, Digital City, WD 12345",
    link: null,
  },
  {
    icon: <ClockCircleOutlined className="contact-icon" />,
    title: "Business Hours",
    description: "Monday - Friday: 9AM - 5PM",
    link: null,
  },
];

// Social media links
const socialLinks = [
  {
    icon: <GithubOutlined />,
    link: "https://github.com",
  },
  {
    icon: <LinkedinOutlined />,
    link: "https://linkedin.com",
  },
  {
    icon: <TwitterOutlined />,
    link: "https://twitter.com",
  },
  {
    icon: <FacebookOutlined />,
    link: "https://facebook.com",
  },
  {
    icon: <InstagramOutlined />,
    link: "https://instagram.com",
  },
];

const ContactInfo = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.7 + i * 0.1,
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="contact-info-card"
    >
      <Title level={3} className="contact-info-title">
        Contact Information
      </Title>

      <List
        itemLayout="horizontal"
        className="contact-info-list"
        dataSource={contactInfo}
        renderItem={(item, index) => (
          <motion.div
            custom={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="contact-info-item"
          >
            <div className="contact-icon-container">{item.icon}</div>
            <div className="contact-info-content">
              <Text strong className="contact-info-label">
                {item.title}
              </Text>
              <Text className="contact-info-text">
                {item.link ? (
                  <a href={item.link}>{item.description}</a>
                ) : (
                  item.description
                )}
              </Text>
            </div>
          </motion.div>
        )}
      />

      <motion.div
        className="social-links-section"
        variants={socialVariants}
        initial="hidden"
        animate="visible"
      >
        <Title level={4} className="social-links-title">
          Connect With Us
        </Title>
        <div className="social-links">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              custom={index}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -10,
                rotate: 10,
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
