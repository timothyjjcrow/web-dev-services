// src/components/About/About.js
import React from "react";
import { Row, Col, Typography, Card, Statistic, Divider, Button } from "antd";
import {
  RocketOutlined,
  TeamOutlined,
  ToolOutlined,
  HeartOutlined,
  ArrowRightOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./About.css";

const { Title, Paragraph, Text } = Typography;

// Company values with icons
const companyValues = [
  {
    icon: <RocketOutlined className="value-icon" />,
    title: "Innovation",
    description:
      "We embrace cutting-edge technologies to deliver solutions that keep you ahead of the curve.",
  },
  {
    icon: <TeamOutlined className="value-icon" />,
    title: "Collaboration",
    description:
      "Your vision combined with our expertise creates the perfect partnership for success.",
  },
  {
    icon: <ToolOutlined className="value-icon" />,
    title: "Expertise",
    description:
      "Our team brings deep knowledge across multiple technologies and industry domains.",
  },
  {
    icon: <HeartOutlined className="value-icon" />,
    title: "Commitment",
    description:
      "We're dedicated to your long-term success, providing support well beyond launch day.",
  },
];

// Company milestones
const companyTimeline = [
  {
    year: "2017",
    title: "Our Beginning",
    description:
      "Started with a small team of passionate developers creating custom web solutions.",
  },
  {
    year: "2019",
    title: "Expanding Horizons",
    description:
      "Added e-commerce development and UI/UX design to our growing service portfolio.",
  },
  {
    year: "2021",
    title: "Team Growth",
    description:
      "Doubled our team size and opened a second office to serve more clients globally.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description:
      "Received multiple awards for outstanding web development projects and client satisfaction.",
  },
];

// Team members with social links
const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Lead Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "10+ years experience in full-stack development with expertise in React and Node.js.",
    social: [
      { icon: <GithubOutlined />, link: "#" },
      { icon: <LinkedinOutlined />, link: "#" },
      { icon: <TwitterOutlined />, link: "#" },
    ],
  },
  {
    name: "Jamie Wilson",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate about creating intuitive user experiences that balance aesthetics and functionality.",
    social: [
      { icon: <LinkedinOutlined />, link: "#" },
      { icon: <TwitterOutlined />, link: "#" },
    ],
  },
  {
    name: "Sam Patel",
    role: "E-commerce Specialist",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    bio: "Specialized in Shopify development with focus on conversion optimization and growth strategies.",
    social: [
      { icon: <GithubOutlined />, link: "#" },
      { icon: <LinkedinOutlined />, link: "#" },
    ],
  },
];

// Key company statistics
const companyStats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "150+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "24", label: "Team Members" },
];

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Use intersection observer hooks for animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-10px 0px",
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  return (
    <section className="about-section" id="about">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-overlay"></div>
        <motion.div
          className="about-hero-content container"
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <Title className="about-hero-title">
            We Build <span className="text-gradient">Digital Experiences</span>
            <br />
            That Transform Businesses
          </Title>
          <Paragraph className="about-hero-description">
            We're a team of passionate developers, designers, and strategists
            dedicated to crafting exceptional web solutions that drive real
            results for businesses worldwide.
          </Paragraph>
        </motion.div>
      </div>

      {/* Our Story Section */}
      <div className="about-story container">
        <Row gutter={[60, 40]} align="middle">
          <Col xs={24} lg={12}>
            <motion.div
              className="about-story-image-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: heroInView ? 1 : 1,
                scale: heroInView ? 1 : 1,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Our team collaborating"
                className="about-story-image"
              />
              <div className="image-accent"></div>
            </motion.div>
          </Col>
          <Col xs={24} lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{
                opacity: heroInView ? 1 : 1,
                x: heroInView ? 0 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="about-story-content"
            >
              <Title level={2} className="section-title">
                Our Story
              </Title>
              <div className="section-title-underline"></div>
              <Paragraph className="about-story-text">
                Founded in 2017, Web Dev Services began with a simple mission:
                to help businesses succeed in the digital world through
                exceptional web experiences. What started as a small team of
                passionate developers has grown into a full-service digital
                agency known for innovation and technical excellence.
              </Paragraph>
              <Paragraph className="about-story-text">
                We believe that a great website is more than just beautiful
                design – it's about creating intuitive user experiences,
                optimizing for performance, and delivering measurable results
                for your business.
              </Paragraph>
              <Button type="primary" className="about-cta-button">
                Learn more about our process <ArrowRightOutlined />
              </Button>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Values Section */}
      <div className="about-values container">
        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="section-header text-center"
          variants={fadeInUp}
        >
          <Title level={2} className="section-title">
            Our Core Values
          </Title>
          <div className="section-title-underline center"></div>
          <Paragraph className="section-subtitle">
            These principles guide everything we do and define how we work with
            our clients
          </Paragraph>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
        >
          <Row gutter={[32, 32]} className="values-row">
            {companyValues.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="value-card"
                >
                  <div className="value-icon-wrapper">{value.icon}</div>
                  <Title level={4} className="value-title">
                    {value.title}
                  </Title>
                  <Paragraph className="value-description">
                    {value.description}
                  </Paragraph>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="about-stats" ref={statsRef}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="stats-container"
          >
            <Row gutter={[40, 40]} justify="center">
              {companyStats.map((stat, index) => (
                <Col xs={12} md={6} key={index}>
                  <motion.div variants={fadeInUp} className="stat-item">
                    <Title level={2} className="stat-value">
                      {stat.value}
                    </Title>
                    <Text className="stat-label">{stat.label}</Text>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="about-timeline container" ref={timelineRef}>
        <motion.div
          className="section-header text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
        >
          <Title level={2} className="section-title">
            Our Journey
          </Title>
          <div className="section-title-underline center"></div>
          <Paragraph className="section-subtitle">
            The key milestones that have defined our growth over the years
          </Paragraph>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="timeline-wrapper"
        >
          {companyTimeline.map((milestone, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="timeline-item"
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">{milestone.year}</div>
                <Title level={4} className="timeline-title">
                  {milestone.title}
                </Title>
                <Paragraph className="timeline-description">
                  {milestone.description}
                </Paragraph>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line"></div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="about-team container" ref={teamRef}>
        <motion.div
          className="section-header text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          <Title level={2} className="section-title">
            Meet Our Team
          </Title>
          <div className="section-title-underline center"></div>
          <Paragraph className="section-subtitle">
            The talented people behind our successful projects
          </Paragraph>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
        >
          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="team-card"
                >
                  <div className="team-image-container">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="team-image"
                    />
                  </div>
                  <div className="team-content">
                    <Title level={4} className="team-name">
                      {member.name}
                    </Title>
                    <div className="team-role">{member.role}</div>
                    <Paragraph className="team-bio">{member.bio}</Paragraph>
                    <div className="team-social">
                      {member.social.map((social, i) => (
                        <a
                          key={i}
                          href={social.link}
                          className="team-social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          className="join-team-cta"
        >
          <Title level={4}>Want to be part of our team?</Title>
          <Button type="primary" size="large" className="about-cta-button">
            View Career Opportunities <ArrowRightOutlined />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
