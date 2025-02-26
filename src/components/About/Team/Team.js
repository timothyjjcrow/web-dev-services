// src/components/About/Team/Team.js
import React from "react";
import { Row, Col, Typography } from "antd";
import { motion } from "framer-motion";
import TeamCard from "./TeamCard";
import { teamMembers } from "../../../data/teamData";

const { Title } = Typography;

const Team = () => {
  return (
    <div className="team-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title level={3} className="team-title">
          Meet Our Team
        </Title>
      </motion.div>
      <Row gutter={[24, 24]}>
        {teamMembers.map((member, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <TeamCard member={member} index={index} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Team;
