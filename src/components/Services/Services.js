// src/components/Services/Services.js
import React, { useState } from "react";
import { Row, Col } from "antd";
import SectionHeader from "./common/SectionHeader";
import ServiceCard from "./ServiceCard";
import { services } from "../../data/servicesData";
import "./Services.css";

const Services = () => {
  const [expandedService, setExpandedService] = useState(null);

  const handleToggleExpand = (index) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <section className="services-section" id="services">
      <SectionHeader
        title="Our Services"
        description="We offer comprehensive web development solutions tailored to your specific needs."
      />
      <Row gutter={[24, 24]} className="services-container">
        {services.map((service, index) => (
          <Col xs={24} md={12} lg={8} key={index} className="service-card-col">
            <ServiceCard
              service={service}
              isExpanded={expandedService === index}
              index={index}
              onToggleExpand={() => handleToggleExpand(index)}
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Services;
