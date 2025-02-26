// src/components/Statistics/Statistics.js
import React from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import { statistics } from "../../data/statisticsData";
import "./Statistics.css";

const Statistics = () => {
  return (
    <section className="statistics-section">
      <Row gutter={[16, 16]} justify="center" className="row-gutter">
        {statistics.map((stat, index) => (
          <Col xs={12} sm={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{ height: "100%" }}
            >
              <StatCard value={stat.value} label={stat.label} />
            </motion.div>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Statistics;
