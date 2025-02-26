// src/components/Statistics/Statistics.js
import React, { useEffect, useState, useRef } from "react";
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
    threshold: 0.2,
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
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="statistics-section" id="statistics">
      <div className="statistics-background">
        <div className="statistics-overlay"></div>
        <div className="statistics-particles">
          {[...Array(20)].map((_, index) => (
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
        <Row gutter={[24, 24]} justify="center" className="row-gutter">
          {statistics.map((stat, index) => (
            <Col xs={12} sm={6} key={index}>
              <StatCard stat={stat} index={index} />
            </Col>
          ))}
        </Row>
      </motion.div>
    </section>
  );
};

export default Statistics;
