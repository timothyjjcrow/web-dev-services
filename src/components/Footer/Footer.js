// src/components/Footer/Footer.js
import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import SocialIcons from "./common/SocialIcons";
import { socialLinks, navLinks } from "../../data/navLinks";
import "./Footer.css";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

const Footer = () => {
  return (
    <AntFooter className="footer">
      <div className="footer-content">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Title level={3} className="footer-title">
                Web Dev Services
              </Title>
              <Paragraph className="footer-description">
                Creating exceptional web experiences that drive results for
                businesses of all sizes.
              </Paragraph>
              <SocialIcons icons={socialLinks} color="dark" />
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Title level={4} className="footer-title">
                Quick Links
              </Title>
              <ul className="footer-links">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Col>

          <Col xs={24} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Title level={4} className="footer-title">
                Contact
              </Title>
              <ul className="footer-contact">
                <li>
                  <MailOutlined className="footer-icon" />
                  <a href="mailto:info@webdevservices.com">
                    info@webdevservices.com
                  </a>
                </li>
                <li>
                  <PhoneOutlined className="footer-icon" />
                  <a href="tel:+1234567890">(123) 456-7890</a>
                </li>
                <li>
                  <ApartmentOutlined className="footer-icon" />
                  123 Web Dev Street, Digital City, WD 12345
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <div className="footer-bottom">
          <Text className="copyright">
            © {new Date().getFullYear()} Web Development Services. All rights
            reserved.
          </Text>
          <div className="footer-legal">
            <motion.a href="#" whileHover={{ color: "#fff" }}>
              Privacy Policy
            </motion.a>
            <motion.a href="#" whileHover={{ color: "#fff" }}>
              Terms of Service
            </motion.a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
