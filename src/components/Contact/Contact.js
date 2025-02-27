// src/components/Contact/Contact.js
import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  message,
  Card,
  List,
} from "antd";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  SendOutlined,
  UserOutlined,
  MessageOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import "./Contact.css";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

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

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const handleSubmit = (values) => {
    setLoading(true);

    const templateParams = {
      name: values.name,
      email: values.email,
      subject: values.subject || "General Inquiry",
      message: values.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          message.success({
            content: "Thank you! We'll get back to you within 24 hours.",
            duration: 5,
          });
          form.resetFields();
          setLoading(false);
        },
        (err) => {
          console.log("FAILED...", err);
          message.error({
            content:
              "There was an error sending your message. Please try again or contact us directly.",
            duration: 5,
          });
          setLoading(false);
        }
      );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-background">
        <div className="contact-overlay"></div>
        {/* Floating elements for visual interest */}
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="contact-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${8 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      <div className="contact-container">
        <motion.div
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          {/* Section header */}
          <motion.div className="contact-header" variants={itemVariants}>
            <Title level={2} className="contact-title">
              Get In Touch
            </Title>
            <Paragraph className="contact-description">
              Ready to start your next project? Contact us today for a free
              consultation and let us help you transform your digital presence.
            </Paragraph>
            <div className="contact-divider">
              <span className="contact-divider-dot"></span>
              <span className="contact-divider-line"></span>
              <span className="contact-divider-dot"></span>
            </div>
          </motion.div>

          <Row gutter={[48, 48]} className="contact-row">
            {/* Contact form */}
            <Col xs={24} lg={14}>
              <motion.div variants={itemVariants}>
                <Card className="contact-form-card">
                  <Title level={3} className="form-title">
                    Send Us a Message
                  </Title>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="contact-form"
                  >
                    <Row gutter={[16, 0]}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="name"
                          label="Your Name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your name"
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          name="email"
                          label="Email Address"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                            {
                              type: "email",
                              message: "Please enter a valid email",
                            },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter your email"
                            size="large"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        { required: true, message: "Please enter a subject" },
                      ]}
                    >
                      <Input placeholder="What's this about?" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="message"
                      label="Your Message"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your message",
                        },
                      ]}
                    >
                      <TextArea
                        prefix={<MessageOutlined />}
                        placeholder="Tell us about your project..."
                        rows={5}
                        size="large"
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
                          size="large"
                          block
                          loading={loading}
                          icon={<SendOutlined />}
                          className="submit-button"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </Form.Item>
                  </Form>
                </Card>
              </motion.div>
            </Col>

            {/* Contact Info */}
            <Col xs={24} lg={10}>
              <motion.div variants={itemVariants}>
                <Card className="contact-info-card">
                  <Title level={3} className="info-title">
                    Contact Information
                  </Title>

                  <List
                    className="contact-info-list"
                    itemLayout="horizontal"
                    dataSource={contactInfo}
                    renderItem={(item) => (
                      <List.Item className="contact-info-item">
                        <div className="info-icon-wrapper">{item.icon}</div>
                        <div className="info-content">
                          <Text strong className="info-label">
                            {item.title}
                          </Text>
                          <Text className="info-text">
                            {item.link ? (
                              <a href={item.link}>{item.description}</a>
                            ) : (
                              item.description
                            )}
                          </Text>
                        </div>
                      </List.Item>
                    )}
                  />

                  <div className="social-links-section">
                    <Title level={4} className="social-title">
                      Connect With Us
                    </Title>
                    <div className="social-icons">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 0.5 + index * 0.1 },
                          }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  <div className="location-preview">
                    <div className="map-container">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991610694953!2d-122.08401708412124!3d37.42203597982346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzEyLjAiTiAxMjLCsDA0JzU4LjAiVw!5e0!3m2!1sen!2sus!4v1613498173509!5m2!1sen!2sus"
                        title="Our Location"
                        allowFullScreen=""
                        loading="lazy"
                      ></iframe>
                      <div className="map-overlay"></div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
