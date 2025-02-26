// src/components/Testimonials/TestimonialCard.js
import React from "react";
import { Card, Typography, Avatar } from "antd";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      style={{ height: "100%" }}
    >
      <Card className="testimonial-card">
        <div className="testimonial-header">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 + index * 0.1,
            }}
          >
            <Avatar size={64} src={testimonial.avatar} />
          </motion.div>
          <div className="testimonial-author">
            <Title level={4}>{testimonial.name}</Title>
            <Text type="secondary">{testimonial.company}</Text>
          </div>
        </div>
        <Paragraph className="testimonial-content">
          "{testimonial.content}"
        </Paragraph>
        <motion.div
          className="testimonial-rating"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
            <motion.span
              key={i}
              className="star filled"
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              ★
            </motion.span>
          ))}
          {testimonial.rating % 1 !== 0 && (
            <span className="star half-filled">★</span>
          )}
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
