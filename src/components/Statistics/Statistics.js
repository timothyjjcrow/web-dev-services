// src/components/Statistics/Statistics.js
import React, { useEffect } from "react";
import { Row, Col } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import StatCard from "./StatCard";
import { statistics } from "../../data/statisticsData";
import "./Statistics.css";

const Statistics = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1, // Lower threshold for mobile
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15, // Slightly faster staggering for mobile
      },
    },
  };

  return (
    <section className="statistics-section" id="statistics">
      <div className="statistics-background">
        <div className="statistics-overlay"></div>
        <div className="statistics-particles">
          {/* Reduced number of particles for better mobile performance */}
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 7}s`,
              }}
            ></div>
          ))}
        </div>
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
