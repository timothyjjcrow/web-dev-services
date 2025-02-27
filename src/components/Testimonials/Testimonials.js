// src/components/Testimonials/Testimonials.js
import React from "react";
import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../data/testimonialData";
import "./Testimonials.css";

const { Title, Paragraph } = Typography;

const Testimonials = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Use intersection observer for animations
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section className="testimonials-section" id="testimonials">
      {/* Background shapes */}
      <div className="testimonials-bg-shape testimonials-shape-1"></div>
      <div className="testimonials-bg-shape testimonials-shape-2"></div>

      {/* Floating particles */}
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="testimonials-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${8 + Math.random() * 7}s`,
          }}
        />
      ))}

      <div className="testimonials-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div className="testimonials-header" variants={itemVariants}>
            <Title level={2} className="testimonials-title">
              Client Testimonials
            </Title>
            <Paragraph className="testimonials-description">
              Don't just take our word for it – hear from our clients about
              their experiences working with our team and the results we've
              delivered.
            </Paragraph>
            <div className="testimonials-divider">
              <span className="testimonials-divider-dot"></span>
              <span className="testimonials-divider-line"></span>
              <span className="testimonials-divider-dot"></span>
            </div>
          </motion.div>

          {/* Testimonial cards */}
          <Row gutter={[32, 32]}>
            {testimonials.map((testimonial, index) => (
              <Col
                xs={24}
                md={12}
                lg={8}
                key={index}
                className="testimonial-card-col"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  inView={inView}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
