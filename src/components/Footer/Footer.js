// src/components/Footer/Footer.js
import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Divider,
  Input,
  Button,
  Form,
  message,
} from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
  SendOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import SocialIcons from "../Common/SocialIcons";
import { socialLinks, navLinks } from "../../data/navLinks";
import { services } from "../../data/servicesData";
import "./Footer.css";

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Text } = Typography;

const Footer = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleNewsletterSignup = (values) => {
    setLoading(true);

    // Simulate API call for newsletter signup
    setTimeout(() => {
      message.success("Thanks for subscribing to our newsletter!");
      form.resetFields();
      setLoading(false);
    }, 1000);
  };

  return (
    <AntFooter className="footer">
      <div className="footer-background">
        <div className="footer-overlay"></div>
        {/* Floating particles */}
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="footer-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      <div className="footer-content">
        <Row gutter={[50, 40]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="footer-logo">
                <div className="logo-text">Web Dev Services</div>
                <div className="logo-underline"></div>
              </div>
              <Paragraph className="footer-description">
                Creating exceptional web experiences that drive results for
                businesses of all sizes. Our team of experts is passionate about
                crafting digital solutions that help your business thrive.
              </Paragraph>
              <div className="footer-social">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="footer-social-link"
                  >
                    {social.icon}
                  </motion.a>
                ))}
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-link"
                >
                  <FacebookOutlined />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-link"
                >
                  <InstagramOutlined />
                </motion.a>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={5}>
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

          <Col xs={24} sm={12} md={8} lg={5}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Title level={4} className="footer-title">
                Our Services
              </Title>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="services"
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {service.title}
                    </Link>
                  </motion.li>
                ))}
                <motion.li whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Request Custom Service
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} md={8} lg={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Title level={4} className="footer-title">
                Stay Updated
              </Title>
              <Paragraph className="footer-description">
                Subscribe to our newsletter to receive updates on latest web
                trends, tips, and exclusive offers.
              </Paragraph>
              <Form
                form={form}
                onFinish={handleNewsletterSignup}
                className="footer-newsletter-form"
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    placeholder="Your email address"
                    prefix={<MailOutlined />}
                    className="footer-newsletter-input"
                  />
                </Form.Item>
                <Form.Item>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      loading={loading}
                      className="footer-newsletter-button"
                    >
                      Subscribe
                    </Button>
                  </motion.div>
                </Form.Item>
              </Form>

              <Title level={4} className="footer-title contact-title">
                Contact Info
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
                <li>
                  <ClockCircleOutlined className="footer-icon" />
                  Monday - Friday: 9AM - 5PM
                </li>
              </ul>
            </motion.div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        <div className="footer-bottom">
          <div className="footer-copyright">
            <Text className="copyright-text">
              © {new Date().getFullYear()} Web Development Services. All rights
              reserved.
            </Text>
          </div>
          <div className="footer-legal">
            <motion.a
              href="#"
              whileHover={{ color: "#26d0ce" }}
              className="footer-legal-link"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#26d0ce" }}
              className="footer-legal-link"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "#26d0ce" }}
              className="footer-legal-link"
            >
              Sitemap
            </motion.a>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
