// src/components/Statistics/StatCard.js
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const StatCard = ({ stat, index }) => {
  const [counted, setCounted] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  // Parse the stat value to get only the number part
  const targetValue = parseInt(stat.value.replace(/[^0-9]/g, ""));

  // Get the suffix (like + or %)
  const suffix = stat.value.replace(/[0-9]/g, "");

  // Simplified animation variants for mobile
  const cardVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: isMobile ? 0.95 : 0.8, // Less scale on mobile
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 70 : 100, // Gentler animation on mobile
        damping: isMobile ? 15 : 12,
        delay: isMobile ? index * 0.08 : index * 0.1, // Faster delays on mobile
      },
    },
    hover: {
      y: isMobile ? -5 : -15, // Smaller hover effect on mobile
      scale: isMobile ? 1.02 : 1.05,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        damping: 20,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: isMobile ? 200 : 300,
        delay: isMobile ? index * 0.15 : index * 0.2 + 0.3,
      },
    },
  };

  // Counter animation
  useEffect(() => {
    // Check if element is in viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Lower threshold for earlier triggering on mobile
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.disconnect();
    };
  }, []);

  // Improved number counter animation
  useEffect(() => {
    if (!isInView) return;

    let startTimestamp;
    const duration = isMobile ? 1500 : 2000; // Shorter animation on mobile
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function for smooth animation
      const easedProgress = easeOutExpo(progress);

      setCounted(Math.floor(easedProgress * targetValue));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, targetValue]);

  // Easing function
  const easeOutExpo = (x) => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  };

  // Get the icon based on the stat type
  const getIcon = () => {
    switch (stat.icon) {
      case "projects":
        return <div className="stat-icon project-icon"></div>;
      case "clients":
        return <div className="stat-icon client-icon"></div>;
      case "experience":
        return <div className="stat-icon experience-icon"></div>;
      case "satisfaction":
        return <div className="stat-icon satisfaction-icon"></div>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={isMobile ? {} : "hover"} // Disable hover animation on mobile
      whileTap={isMobile ? { scale: 0.98 } : {}} // Add tap feedback on mobile
      className="stat-card-wrapper"
    >
      <Card className="statistic-card">
        <motion.div variants={iconVariants} className="stat-icon-container">
          {getIcon()}
        </motion.div>

        <div className="stat-value-container">
          <Title level={2} className="stat-value">
            <span className="stat-number">{counted}</span>
            <span className="stat-suffix">{suffix}</span>
          </Title>
        </div>

        <Text className="stat-label">{stat.label}</Text>

        <div className="stat-highlight"></div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
