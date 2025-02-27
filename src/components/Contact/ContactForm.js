// src/components/Contact/ContactForm.js
import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, message } from "antd";
import { motion } from "framer-motion";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  SendOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";

const { Title } = Typography;
const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleSubmit = (values) => {
    setLoading(true);

    const templateParams = {
      name: values.name,
      email: values.email,
      phone: values.phone || "Not provided",
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
            icon: <SendOutlined style={{ color: "#26d0ce" }} />,
            style: {
              marginTop: "20vh",
              borderLeft: "5px solid #26d0ce",
            },
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
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="contact-form-card"
    >
      <Title level={3} className="contact-form-title">
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
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
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
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="phone"
              label="Phone Number (Optional)"
              rules={[
                {
                  pattern: /^[0-9\s+()-]*$/,
                  message: "Please enter a valid phone number",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Enter your phone number"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input placeholder="What's this about?" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="message"
          label="Your Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <TextArea
            placeholder="Tell us about your project..."
            rows={6}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              icon={<SendOutlined />}
              className="contact-form-button"
            >
              Send Message
            </Button>
          </motion.div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default ContactForm;
