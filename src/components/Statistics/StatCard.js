// src/components/Statistics/StatCard.js
import React from "react";
import { Card, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const StatCard = ({ value, label }) => {
  return (
    <Card className="statistic-card">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={2} className="animated-value">
          {value}
        </Title>
        <Text>{label}</Text>
      </motion.div>
    </Card>
  );
};

export default StatCard;
