// src/components/Contact/Contact.js
import React from "react";
import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./Contact.css";

const { Title, Paragraph } = Typography;

const Contact = () => {
  // Use intersection observer for animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="contact-section" id="contact">
      {/* Background shapes */}
      <div className="contact-bg-shape shape-1"></div>
      <div className="contact-bg-shape shape-2"></div>

      {/* Particles for background effect */}
      <div className="contact-particles">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="contact-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Section header */}
      <motion.div
        ref={headerRef}
        variants={headerVariants}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        className="contact-header"
      >
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

      {/* Main content */}
      <motion.div
        ref={contentRef}
        variants={contentVariants}
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
        className="contact-wrapper"
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={10}>
            <ContactInfo />
          </Col>
          <Col xs={24} lg={14}>
            <ContactForm />
          </Col>
        </Row>

        {/* Optional: Add a map */}
        <Row>
          <Col span={24}>
            <motion.div
              className="contact-map"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991610694953!2d-122.08401708412124!3d37.42203597982346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzEyLjAiTiAxMjLCsDA0JzU4LjAiVw!5e0!3m2!1sen!2sus!4v1613498173509!5m2!1sen!2sus"
                title="Our Location"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="contact-map-overlay"></div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </section>
  );
};

export default Contact;
