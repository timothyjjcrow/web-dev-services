// src/components/Testimonials/TestimonialCard.js
import React from "react";
import { Card, Typography, Avatar } from "antd";
import { motion } from "framer-motion";
import { MessageOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const TestimonialCard = ({ testimonial, index, inView }) => {
  // Animation variants
  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: index * 0.1,
        duration: 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + index * 0.1,
        duration: 0.4,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2 + index * 0.1,
      },
    },
  };

  // Create an array of stars for the rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <motion.span
          key={`star-${i}`}
          className="star filled"
          initial={{ rotate: -30, opacity: 0 }}
          animate={
            inView ? { rotate: 0, opacity: 1 } : { rotate: -30, opacity: 0 }
          }
          transition={{ delay: 0.4 + i * 0.1 + index * 0.1 }}
        >
          ★
        </motion.span>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <motion.span
          key="half-star"
          className="star half-filled"
          initial={{ rotate: -30, opacity: 0 }}
          animate={
            inView ? { rotate: 0, opacity: 1 } : { rotate: -30, opacity: 0 }
          }
          transition={{ delay: 0.4 + fullStars * 0.1 + index * 0.1 }}
        >
          ★
        </motion.span>
      );
    }

    return stars;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <Card className="testimonial-card">
        <div className="testimonial-header">
          <motion.div
            variants={avatarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Avatar
              size={70}
              src={testimonial.avatar}
              style={{ border: "3px solid rgba(38, 208, 206, 0.3)" }}
            />
          </motion.div>
          <div className="testimonial-author">
            <Title level={4}>{testimonial.name}</Title>
            <Text>{testimonial.company}</Text>
          </div>
        </div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Paragraph className="testimonial-content">
            {testimonial.content}
          </Paragraph>
        </motion.div>

        <div className="testimonial-rating">
          {renderStars(testimonial.rating)}
        </div>

        {/* Decorative quote icon */}
        <div className="testimonial-quote-icon">
          <MessageOutlined />
        </div>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
