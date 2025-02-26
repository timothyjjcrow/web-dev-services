// src/components/About/About.js
import React from "react";
import { Row, Col, Typography, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import SectionHeader from "../Common/SectionHeader";
import Team from "./Team/Team";
import "./About.css";

const { Title, Paragraph } = Typography;

const aboutPoints = [
  "Expert team with proven track record",
  "Tailored solutions for your specific needs",
  "Transparent communication throughout the project",
  "Commitment to quality and attention to detail",
  "Ongoing support and partnership",
];

const About = () => {
  return (
    <section className="about-section" id="about">
      <SectionHeader
        title="About Us"
        description="We're a team of passionate developers, designers, and digital strategists dedicated to creating exceptional web experiences."
      />

      <Row gutter={[24, 24]} align="middle" className="about-content">
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="about-image-container"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="Our team working together"
              className="about-image"
            />
          </motion.div>
        </Col>
        <Col xs={24} md={12}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="about-text"
          >
            <Title level={3}>Our Approach</Title>
            <Paragraph>
              We believe that a great website is more than just beautiful design
              – it's about creating intuitive user experiences, optimizing for
              performance, and delivering measurable results for your business.
            </Paragraph>
            <Paragraph>
              Our collaborative process ensures we understand your goals and
              deliver solutions that exceed expectations. From initial concept
              to launch and beyond, we're committed to your success in the
              digital landscape.
            </Paragraph>
            <Title level={3}>Why Choose Us</Title>
            <List
              itemLayout="horizontal"
              dataSource={aboutPoints}
              renderItem={(item, i) => (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
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
          </motion.div>
        </Col>
      </Row>

      {/* Team Section */}
      <Team />
    </section>
  );
};

export default About;
