// src/components/Contact/ContactForm.js
import React, { useState } from "react";
import { Card, Form, Input, Button, message, Typography, Row, Col } from "antd";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const { Title } = Typography;
const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
          message.success(
            "Thanks for reaching out! We'll get back to you within 24 hours."
          );
          form.resetFields();
          setLoading(false);
        },
        (err) => {
          console.log("FAILED...", err);
          message.error(
            "There was an error sending your message. Please try again or contact us directly."
          );
          setLoading(false);
        }
      );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height: "100%" }}
    >
      <Card className="contact-form-card">
        <Title level={3}>Send Us a Message</Title>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
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
                <Input placeholder="Your email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="phone" label="Phone (Optional)">
                <Input placeholder="Your phone number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="subject" label="Subject">
                <Input placeholder="What's this about?" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="message"
            label="Message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <TextArea rows={6} placeholder="Tell us about your project..." />
          </Form.Item>

          <Form.Item>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
              >
                Send Message
              </Button>
            </motion.div>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
