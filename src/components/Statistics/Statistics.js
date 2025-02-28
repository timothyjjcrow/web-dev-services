// src/components/Statistics/Statistics.js
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import StatCard from "./StatCard";
import { statistics } from "../../data/statisticsData";
import "./Statistics.css";

const Statistics = () => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: isMobile ? 0.05 : 0.1, // Lower threshold for mobile
  });

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? 0.08 : 0.15, // Faster staggering for mobile
      },
    },
  };

  // Render only a subset of particles on mobile
  const renderParticles = () => {
    const particleCount = isMobile ? 4 : 10; // Fewer particles on mobile

    return [...Array(particleCount)].map((_, index) => (
      <div
        key={index}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${(isMobile ? 5 : 8) + Math.random() * 5}s`,
          width: isMobile
            ? `${2 + Math.random() * 2}px`
            : `${3 + Math.random() * 3}px`,
          height: isMobile
            ? `${2 + Math.random() * 2}px`
            : `${3 + Math.random() * 3}px`,
        }}
      ></div>
    ));
  };

  return (
    <section className="statistics-section" id="statistics">
      <div className="statistics-background">
        <div className="statistics-overlay"></div>
        <div className="statistics-particles">{renderParticles()}</div>
      </div>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="statistics-container"
      >
        <Row
          gutter={[
            { xs: 12, sm: 16, md: 24 },
            { xs: 12, sm: 16, md: 24 },
          ]}
          justify="center"
          className="row-gutter"
        >
          {statistics.map((stat, index) => (
            <Col xs={24} sm={12} md={6} key={index} className="stat-card-col">
              <StatCard stat={stat} index={index} />
            </Col>
          ))}
        </Row>
      </motion.div>
    </section>
  );
};

export default Statistics;
