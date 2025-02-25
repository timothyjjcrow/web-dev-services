import React, { useState, useEffect } from "react";
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
  Typography,
  Divider,
  Avatar,
  List,
  Spin,
  Badge,
  BackTop,
  Tooltip,
} from "antd";
import emailjs from "emailjs-com";
import { Link } from "react-scroll";
import "./App.css";
import {
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  UpOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import shopifyLogo from "./shopifyLogo.jpg";
import vueLogo from "./vueLogo.png";
import reactLogo from "./reactLogo.png";
import angularLogo from "./angular-3-logo-svg-vector.svg";
// Using placeholder images for these
import wordpressLogo from "./shopifyLogo.jpg";
import nodeLogo from "./reactLogo.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Fashion Boutique",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "Working with this team was a game-changer for our online presence. Our e-commerce site is now generating 40% more sales!",
    rating: 5,
  },
  {
    name: "Mark Thompson",
    company: "Tech Innovations",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content:
      "The custom web application they built has streamlined our internal processes significantly. Highly recommended!",
    rating: 5,
  },
  {
    name: "Lisa Chen",
    company: "Organic Foods Co",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    content:
      "Professional, responsive, and delivered exactly what we needed. Our website looks amazing and is so easy to manage.",
    rating: 4.5,
  },
];

// Team members data
const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "10+ years experience in full-stack development with expertise in React and Node.js.",
  },
  {
    name: "Jamie Wilson",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate about creating intuitive user experiences that balance aesthetics and functionality.",
  },
  {
    name: "Sam Patel",
    role: "E-commerce Specialist",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    bio: "Specialized in Shopify development with focus on conversion optimization.",
  },
];

// Services data with expanded details
const services = [
  {
    title: "Custom Web Development",
    description:
      "Tailored websites that perfectly match your business requirements and goals.",
    details:
      "Our team crafts custom web solutions using cutting-edge technologies that ensure optimal performance, scalability, and user experience. We follow industry best practices for clean code, responsive design, and accessibility standards.",
    features: [
      "Responsive design that looks great on all devices",
      "Performance optimization for fast loading times",
      "SEO-friendly architecture and implementation",
      "Custom functionality tailored to your business needs",
      "Thorough testing and quality assurance",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Angular", svg: angularLogo, link: "https://angular.io/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
      { name: "Node.js", svg: nodeLogo, link: "https://nodejs.org/" },
    ],
  },
  {
    title: "E-commerce Solutions",
    description:
      "Powerful online stores that drive sales and provide excellent customer experiences.",
    details:
      "We build e-commerce platforms that combine attractive design with powerful functionality. Our solutions include secure payment processing, inventory management, customer accounts, and analytics integration to help you grow your online business.",
    features: [
      "User-friendly product catalog and shopping cart",
      "Secure payment gateway integration",
      "Inventory and order management",
      "Customer account management",
      "Mobile-optimized shopping experience",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "Shopify", svg: shopifyLogo, link: "https://www.shopify.com/" },
      { name: "WordPress", svg: wordpressLogo, link: "https://wordpress.org/" },
    ],
  },
  {
    title: "Website Maintenance",
    description:
      "Comprehensive care to keep your site secure, updated, and performing at its best.",
    details:
      "Our maintenance packages ensure your website remains secure, up-to-date, and running smoothly. We handle regular updates, security monitoring, performance optimization, content updates, and technical support to give you peace of mind.",
    features: [
      "Regular software and security updates",
      "Performance monitoring and optimization",
      "Content updates and management",
      "Backup and recovery solutions",
      "Technical support and troubleshooting",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "WordPress", svg: wordpressLogo, link: "https://wordpress.org/" },
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
    ],
  },
];

// Statistics data
const statistics = [
  { value: "500+", label: "Projects Completed" },
  { value: "150+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

const App = () => {
  const [form] = Form.useForm();
  const [expandedService, setExpandedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible =
        lastScrollPosition > currentScrollPos || currentScrollPos < 100;

      setMenuVisible(visible);
      setLastScrollPosition(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  const handleSubmit = (values) => {
    setLoading(true);

    const templateParams = {
      name: values.name,
      email: values.email,
      phone: values.phone || "Not provided",
      subject: values.subject || "General Inquiry",
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
          message.success(
            "Thanks for reaching out! We'll get back to you within 24 hours."
          );
          form.resetFields();
          setLoading(false);
        },
        (err) => {
          console.log("FAILED...", err);
          message.error(
            "There was an error sending your message. Please try again or contact us directly."
          );
          setLoading(false);
        }
      );
  };

  const renderServiceCard = (service, index) => {
    const isExpanded = expandedService === index;

    return (
      <Col xs={24} md={12} lg={8} key={index} className="service-card-col">
        <Card
          hoverable
          className={`service-card ${isExpanded ? "expanded" : ""}`}
          cover={
            <img
              alt={service.title}
              src={service.image}
              className="service-image"
            />
          }
          onClick={() => setExpandedService(isExpanded ? null : index)}
        >
          <Card.Meta
            title={<Title level={4}>{service.title}</Title>}
            description={service.description}
          />

          {isExpanded && (
            <div className="service-details">
              <Divider />
              <Paragraph>{service.details}</Paragraph>

              <Title level={5}>Key Features:</Title>
              <List
                itemLayout="horizontal"
                dataSource={service.features}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <CheckCircleOutlined style={{ color: "#1890ff" }} />
                      }
                      title={item}
                    />
                  </List.Item>
                )}
              />

              <div className="service-technologies">
                <Title level={5}>Technologies:</Title>
                <div className="service-logos">
                  {service.logos.map((logo, i) => (
                    <Tooltip title={logo.name} key={i}>
                      <a
                        href={logo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-logo"
                      >
                        <img src={logo.svg} alt={`${logo.name} logo`} />
                      </a>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>
      </Col>
    );
  };

  return (
    <Layout className="layout">
      <Header className={`header ${menuVisible ? "visible" : "hidden"}`}>
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
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              About
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link
              activeClass="active"
              to="testimonials"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Testimonials
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
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
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <Badge.Ribbon text="Professional" color="blue">
              <Title className="hero-title">Web Development Services</Title>
            </Badge.Ribbon>
            <Paragraph className="hero-description">
              We create stunning, high-performance websites and applications
              that help businesses thrive in the digital world.
            </Paragraph>
            <div className="hero-buttons">
              <Button type="primary" size="large" className="hero-button">
                <Link
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Get in Touch
                </Link>
              </Button>
              <Button size="large" className="hero-button secondary">
                <Link
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  Our Services
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="statistics-section">
          <Row gutter={[16, 16]} justify="center">
            {statistics.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card className="statistic-card">
                  <Title level={2}>{stat.value}</Title>
                  <Text>{stat.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Services Section */}
        <section className="services-section" id="services">
          <div className="section-header">
            <Title level={2}>Our Services</Title>
            <Paragraph className="section-description">
              We offer comprehensive web development solutions tailored to your
              specific needs.
            </Paragraph>
            <Divider />
          </div>
          <Row gutter={[24, 24]} className="services-container">
            {services.map((service, index) =>
              renderServiceCard(service, index)
            )}
          </Row>
        </section>

        {/* About Us Section */}
        <section className="about-section" id="about">
          <div className="section-header">
            <Title level={2}>About Us</Title>
            <Paragraph className="section-description">
              We're a team of passionate developers, designers, and digital
              strategists dedicated to creating exceptional web experiences.
            </Paragraph>
            <Divider />
          </div>

          <Row gutter={[24, 24]} align="middle" className="about-content">
            <Col xs={24} md={12}>
              <div className="about-image-container">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Our team working together"
                  className="about-image"
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="about-text">
                <Title level={3}>Our Approach</Title>
                <Paragraph>
                  We believe that a great website is more than just beautiful
                  design – it's about creating intuitive user experiences,
                  optimizing for performance, and delivering measurable results
                  for your business.
                </Paragraph>
                <Paragraph>
                  Our collaborative process ensures we understand your goals and
                  deliver solutions that exceed expectations. From initial
                  concept to launch and beyond, we're committed to your success
                  in the digital landscape.
                </Paragraph>
                <Title level={3}>Why Choose Us</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    "Expert team with proven track record",
                    "Tailored solutions for your specific needs",
                    "Transparent communication throughout the project",
                    "Commitment to quality and attention to detail",
                    "Ongoing support and partnership",
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <CheckCircleOutlined style={{ color: "#1890ff" }} />
                        }
                        title={item}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>

          {/* Team Section */}
          <div className="team-section">
            <Title level={3}>Meet Our Team</Title>
            <Row gutter={[24, 24]}>
              {teamMembers.map((member, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card className="team-card">
                    <div className="team-member-avatar">
                      <Avatar size={100} src={member.avatar} />
                    </div>
                    <Title level={4}>{member.name}</Title>
                    <Text strong>{member.role}</Text>
                    <Paragraph className="team-member-bio">
                      {member.bio}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section" id="testimonials">
          <div className="section-header">
            <Title level={2}>Client Testimonials</Title>
            <Paragraph className="section-description">
              Don't just take our word for it – here's what our clients have to
              say.
            </Paragraph>
            <Divider />
          </div>

          <Row gutter={[24, 24]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="testimonial-card">
                  <div className="testimonial-header">
                    <Avatar size={64} src={testimonial.avatar} />
                    <div className="testimonial-author">
                      <Title level={4}>{testimonial.name}</Title>
                      <Text type="secondary">{testimonial.company}</Text>
                    </div>
                  </div>
                  <Paragraph className="testimonial-content">
                    "{testimonial.content}"
                  </Paragraph>
                  <div className="testimonial-rating">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <span key={i} className="star filled">
                        ★
                      </span>
                    ))}
                    {testimonial.rating % 1 !== 0 && (
                      <span className="star half-filled">★</span>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Contact Section */}
        <section className="contact-section" id="contact">
          <div className="section-header">
            <Title level={2}>Get In Touch</Title>
            <Paragraph className="section-description">
              Ready to start your project? Contact us today for a free
              consultation.
            </Paragraph>
            <Divider />
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card className="contact-info-card">
                <Title level={3}>Contact Information</Title>
                <List itemLayout="horizontal" className="contact-info-list">
                  <List.Item>
                    <List.Item.Meta
                      avatar={<MailOutlined className="contact-icon" />}
                      title="Email"
                      description={
                        <a href="mailto:info@webdevservices.com">
                          info@webdevservices.com
                        </a>
                      }
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<PhoneOutlined className="contact-icon" />}
                      title="Phone"
                      description={<a href="tel:+1234567890">(123) 456-7890</a>}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ApartmentOutlined className="contact-icon" />}
                      title="Address"
                      description="123 Web Dev Street, Digital City, WD 12345"
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ClockCircleOutlined className="contact-icon" />}
                      title="Business Hours"
                      description="Monday - Friday: 9AM - 5PM"
                    />
                  </List.Item>
                </List>

                <div className="social-links">
                  <Title level={4}>Connect With Us</Title>
                  <div className="social-icons">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubOutlined />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinOutlined />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterOutlined />
                    </a>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="contact-form-card">
                <Title level={3}>Send Us a Message</Title>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                          { required: true, message: "Please enter your name" },
                        ]}
                      >
                        <Input placeholder="Your name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input placeholder="Your email" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name="phone" label="Phone (Optional)">
                        <Input placeholder="Your phone number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="subject" label="Subject">
                        <Input placeholder="What's this about?" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[
                      { required: true, message: "Please enter your message" },
                    ]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Tell us about your project..."
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      block
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </section>
      </Content>

      <Footer className="footer">
        <div className="footer-content">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Title level={3} className="footer-title">
                Web Dev Services
              </Title>
              <Paragraph className="footer-description">
                Creating exceptional web experiences that drive results for
                businesses of all sizes.
              </Paragraph>
              <div className="footer-social">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubOutlined />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TwitterOutlined />
                </a>
              </div>
            </Col>

            <Col xs={24} md={8}>
              <Title level={4} className="footer-title">
                Quick Links
              </Title>
              <ul className="footer-links">
                <li>
                  <Link
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="testimonials"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </Col>

            <Col xs={24} md={8}>
              <Title level={4} className="footer-title">
                Contact
              </Title>
              <ul className="footer-contact">
                <li>
                  <MailOutlined className="footer-icon" />
                  <a href="mailto:info@webdevservices.com">
                    info@webdevservices.com
                  </a>
                </li>
                <li>
                  <PhoneOutlined className="footer-icon" />
                  <a href="tel:+1234567890">(123) 456-7890</a>
                </li>
                <li>
                  <ApartmentOutlined className="footer-icon" />
                  123 Web Dev Street, Digital City, WD 12345
                </li>
              </ul>
            </Col>
          </Row>

          <Divider className="footer-divider" />

          <div className="footer-bottom">
            <Text className="copyright">
              © {new Date().getFullYear()} Web Development Services. All rights
              reserved.
            </Text>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </Footer>

      <BackTop>
        <div className="back-to-top">
          <UpOutlined />
        </div>
      </BackTop>
    </Layout>
  );
};

export default App;
