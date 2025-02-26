// src/components/common/SectionHeader.js
import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph } = Typography;

const SectionHeader = ({ title, description }) => {
  return (
    <div
      className="section-header"
      data-aos="fade-up"
      style={{ marginBottom: "60px" }}
    >
      <Title level={2}>{title}</Title>
      <Paragraph
        className="section-description"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "40px",
          fontSize: "18px",
          color: "var(--text-light)",
        }}
      >
        {description}
      </Paragraph>
      <Divider style={{ margin: "20px 0" }} />
    </div>
  );
};

export default SectionHeader;
