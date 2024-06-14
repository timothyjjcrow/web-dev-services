import React, { useState } from "react";
import {
  Layout,
  Menu,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
} from "antd";
import emailjs from "emailjs-com";
import { Link } from "react-scroll";
import "./App.css";
import shopifyLogo from "./shopifyLogo.jpg";
import vueLogo from "./vueLogo.png";
import reactLogo from "./reactLogo.png";
import angularLogo from "./angular-3-logo-svg-vector.svg";

const { Header, Content, Footer } = Layout;

const services = [
  {
    title: "Custom Web Development",
    description: "We build custom websites tailored to your business needs.",
    details:
      "Our expertise includes HTML, CSS, JavaScript, React, Angular, and Vue.js.",
    image: "https://via.placeholder.com/400",
    logos: [
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Angular", svg: angularLogo, link: "https://angular.io/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
    ],
  },
  {
    title: "E-commerce Solutions",
    description:
      "Our team specializes in creating robust e-commerce platforms.",
    details:
      "We use platforms like Shopify, WooCommerce, and custom-built solutions to meet your needs.",
    image: "https://via.placeholder.com/400",
    logos: [
      { name: "Shopify", svg: shopifyLogo, link: "https://www.shopify.com/" },
    ],
  },
  {
    title: "Website Maintenance",
    description:
      "We offer comprehensive maintenance services to keep your site running smoothly.",
    details:
      "Services include regular updates, security checks, and performance optimization.",
    image: "https://via.placeholder.com/400",
    logos: [
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
    ],
  },
];

const App = () => {
  const [form] = Form.useForm();
  const [expandedService, setExpandedService] = useState(null);

  const handleSubmit = (values) => {
    const templateParams = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          message.success("Your message has been sent successfully!");
          form.resetFields();
        },
        (err) => {
          console.log("FAILED...", err);
          message.error(
            "There was an error sending your message. Please try again later."
          );
        }
      );
  };

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">Web Dev Services</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link
              activeClass="active"
              to="services"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Services
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Contact
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <section className="hero-section" id="home">
          <h1 className="hero-title">Professional Web Development Services</h1>
          <p className="hero-description">
            We create stunning and efficient websites to help your business
            grow. Get in touch with us to start your project today.
          </p>
          <Button
            type="primary"
            size="large"
            href="#contact"
            className="hero-button"
          >
            Contact Us
          </Button>
        </section>
        <section className="services-section" id="services">
          <h1>Our Services</h1>
          <Row gutter={16}>
            {services.map((service, index) => (
              <Col
                span={8}
                key={index}
                className={`service-card ${
                  expandedService === index ? "expanded" : ""
                }`}
                onMouseEnter={() => setExpandedService(index)}
                onMouseLeave={() => setExpandedService(null)}
              >
                <Card
                  hoverable
                  cover={<img alt={service.title} src={service.image} />}
                >
                  <Card.Meta
                    title={service.title}
                    description={service.description}
                  />
                  {expandedService === index && (
                    <div className="service-details">
                      <p>{service.details}</p>
                      <div className="service-logos">
                        {service.logos.map((logo, i) => (
                          <a
                            href={logo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i}
                            className="service-logo"
                          >
                            <img src={logo.svg} alt={`${logo.name} logo`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </section>
        <section className="contact-section" id="contact">
          <h2>Contact Us</h2>
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Your name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Your email" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} placeholder="Your message" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </section>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Web Development Services ©2024 Created by Your Company
      </Footer>
    </Layout>
  );
};

export default App;
