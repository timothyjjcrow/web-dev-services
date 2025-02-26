// src/components/About/Team/TeamCard.js
import React from "react";
import { Card, Typography, Avatar } from "antd";
import { motion } from "framer-motion";

const { Title, Text, Paragraph } = Typography;

const TeamCard = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      style={{ height: "100%" }}
    >
      <Card className="team-card">
        <motion.div
          className="team-member-avatar"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar size={100} src={member.avatar} />
        </motion.div>
        <Title level={4}>{member.name}</Title>
        <Text strong className="team-member-role">
          {member.role}
        </Text>
        <Paragraph className="team-member-bio">{member.bio}</Paragraph>
      </Card>
    </motion.div>
  );
};

export default TeamCard;
