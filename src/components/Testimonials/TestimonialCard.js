// src/components/Testimonials/TestimonialCard.js
import React, { useState, useEffect } from "react";
import { Card, Typography, Avatar } from "antd";
import { motion } from "framer-motion";
import { MessageOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const TestimonialCard = ({ testimonial, index, inView }) => {
  // Check if we're on a mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update mobile state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants - simplified for mobile
  const cardVariants = {
    hidden: {
      y: isMobile ? 15 : 30, // Less movement on mobile
      opacity: 0,
      scale: isMobile ? 0.98 : 0.95, // Less scaling on mobile
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: isMobile ? "tween" : "spring", // Simpler animation type on mobile
        stiffness: isMobile ? 50 : 100,
        damping: isMobile ? 8 : 12,
        delay: isMobile ? index * 0.05 : index * 0.1, // Shorter delays on mobile
        duration: isMobile ? 0.4 : 0.5,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 }, // Less movement on mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: isMobile ? 0.05 + index * 0.05 : 0.1 + index * 0.1,
        duration: isMobile ? 0.3 : 0.4,
      },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: isMobile ? "tween" : "spring", // Simpler animation type on mobile
        stiffness: isMobile ? 100 : 260,
        damping: isMobile ? 10 : 20,
        delay: isMobile ? 0.1 + index * 0.05 : 0.2 + index * 0.1,
      },
    },
  };

  // Create an array of stars for the rating - optimized for mobile
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
            inView
              ? {
                  rotate: 0,
                  opacity: 1,
                  transition: {
                    delay: isMobile
                      ? 0.2 + i * 0.05
                      : 0.4 + i * 0.1 + index * 0.1,
                    duration: isMobile ? 0.3 : 0.4,
                  },
                }
              : { rotate: -30, opacity: 0 }
          }
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
            inView
              ? {
                  rotate: 0,
                  opacity: 1,
                  transition: {
                    delay: isMobile
                      ? 0.2 + fullStars * 0.05
                      : 0.4 + fullStars * 0.1 + index * 0.1,
                    duration: isMobile ? 0.3 : 0.4,
                  },
                }
              : { rotate: -30, opacity: 0 }
          }
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
      whileHover={isMobile ? {} : { y: -10, transition: { duration: 0.3 } }}
      whileTap={isMobile ? { scale: 0.98 } : {}}
    >
      <Card className="testimonial-card">
        <div className="testimonial-header">
          <motion.div
            variants={avatarVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Avatar
              size={isMobile ? 60 : 70}
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

        {/* Decorative quote icon - only show on larger screens */}
        {!isMobile && (
          <div className="testimonial-quote-icon">
            <MessageOutlined />
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
