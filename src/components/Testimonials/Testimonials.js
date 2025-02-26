// src/components/Testimonials/Testimonials.js
import React from "react";
import { Row, Col } from "antd";
import SectionHeader from "../common/SectionHeader";
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../../data/testimonialData";
import "./Testimonials.css";

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <SectionHeader
        title="Client Testimonials"
        description="Don't just take our word for it – here's what our clients have to say."
      />
      <Row gutter={[24, 24]}>
        {testimonials.map((testimonial, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <TestimonialCard testimonial={testimonial} index={index} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Testimonials;
