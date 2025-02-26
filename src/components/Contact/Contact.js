// src/components/Contact/Contact.js
import React from "react";
import { Row, Col } from "antd";
import SectionHeader from "../common/SectionHeader";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <SectionHeader
        title="Get In Touch"
        description="Ready to start your project? Contact us today for a free consultation."
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ContactInfo />
        </Col>
        <Col xs={24} md={12}>
          <ContactForm />
        </Col>
      </Row>
    </section>
  );
};

export default Contact;
