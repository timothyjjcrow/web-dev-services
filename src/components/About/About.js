// src/components/About/About.js
import React from "react";
import { Row, Col, Typography, List, Card, Statistic } from "antd";
import {
  CheckCircleOutlined,
  TrophyOutlined,
  RocketOutlined,
  ToolOutlined,
  TeamOutlined,
  HeartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "../Common/SectionHeader";
import "./About.css";

const { Title, Paragraph, Text } = Typography;

// Features with icons
const aboutFeatures = [
  {
    icon: <RocketOutlined className="feature-icon" />,
    title: "Innovation",
    description:
      "We stay at the forefront of web development technologies to deliver cutting-edge solutions.",
  },
  {
    icon: <TeamOutlined className="feature-icon" />,
    title: "Collaboration",
    description:
      "We work closely with you throughout the project to ensure your vision is realized.",
  },
  {
    icon: <ToolOutlined className="feature-icon" />,
    title: "Expertise",
    description:
      "Our team brings years of experience in diverse web technologies and industry domains.",
  },
  {
    icon: <HeartOutlined className="feature-icon" />,
    title: "Commitment",
    description:
      "We're dedicated to your success and provide ongoing support beyond project completion.",
  },
];

// Company milestones
const companyTimeline = [
  {
    date: "2017",
    event: "Company Founded",
    description:
      "Started with a small team of passionate developers focused on creating custom web solutions.",
  },
  {
    date: "2019",
    event: "Expanded Services",
    description:
      "Added e-commerce development and UI/UX design to our service offerings.",
  },
  {
    date: "2021",
    event: "Team Growth",
    description:
      "Doubled our team size and opened a second office to serve more clients.",
  },
  {
    date: "2023",
    event: "Industry Recognition",
    description:
      "Received multiple awards for outstanding web development projects.",
  },
];

// Additional quick stats
const aboutStats = [
  {
    icon: <TrophyOutlined />,
    value: "15+",
    label: "Awards Won",
  },
  {
    icon: <TeamOutlined />,
    value: "24",
    label: "Team Members",
  },
  {
    icon: <RocketOutlined />,
    value: "30+",
    label: "Technologies",
  },
  {
    icon: <HeartOutlined />,
    value: "100%",
    label: "Passion",
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
      { icon: <FacebookOutlined />, link: "#" },
      { icon: <TwitterOutlined />, link: "#" },
    ],
  },
  {
    name: "Sam Patel",
    role: "E-commerce Specialist",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    bio: "Specialized in Shopify development with focus on conversion optimization.",
    social: [
      { icon: <GithubOutlined />, link: "#" },
      { icon: <LinkedinOutlined />, link: "#" },
      { icon: <TwitterOutlined />, link: "#" },
    ],
  },
];

const About = () => {
  // Animation variants for staggered animations - faster and more seamless
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Faster stagger
        delayChildren: 0.1, // Reduced delay
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Less vertical movement
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }, // Faster animation
    },
  };

  // Use intersection observer for animations with earlier triggering
  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px", // Trigger earlier - when element is 10% from entering viewport
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: false,
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px", // Trigger even earlier
  });

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: false,
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px",
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: false,
    threshold: 0.05,
    rootMargin: "0px 0px -15% 0px",
  });

  return (
    <section className="about-section" id="about">
      {/* Background shapes */}
      <div className="about-bg-shape shape-1"></div>
      <div className="about-bg-shape shape-2"></div>

      {/* Section header */}
      <div className="about-header">
        <Title level={2} className="about-title">
          About Us
        </Title>
        <Paragraph className="about-description">
          We're a team of passionate developers, designers, and digital
          strategists dedicated to creating exceptional web experiences that
          drive real results for your business.
        </Paragraph>
        <div className="about-divider">
          <span className="about-divider-dot"></span>
          <span className="about-divider-line"></span>
          <span className="about-divider-dot"></span>
        </div>
      </div>

      {/* Main content */}
      <motion.div
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        animate={contentInView ? "visible" : "hidden"}
      >
        <Row gutter={[40, 40]} className="about-content-wrapper">
          <Col xs={24} md={12}>
            <motion.div
              className="about-image-container"
              variants={itemVariants}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
                alt="Our team collaborating"
                className="about-image"
              />
            </motion.div>
          </Col>
          <Col xs={24} md={12}>
            <motion.div className="about-content" variants={itemVariants}>
              <Title level={3} className="about-content-title">
                Our Approach
              </Title>
              <Paragraph className="about-text">
                We believe that a great website is more than just beautiful
                design – it's about creating intuitive user experiences,
                optimizing for performance, and delivering measurable results
                for your business.
              </Paragraph>
              <Paragraph className="about-text">
                Our collaborative process ensures we understand your goals and
                deliver solutions that exceed expectations. From initial concept
                to launch and beyond, we're committed to your success in the
                digital landscape.
              </Paragraph>

              <div className="about-features">
                {aboutFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-item"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <div className="feature-icon-container">{feature.icon}</div>
                    <div className="feature-content">
                      <Text strong className="feature-title">
                        {feature.title}
                      </Text>
                      <Paragraph className="feature-description">
                        {feature.description}
                      </Paragraph>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Col>
        </Row>

        {/* Quick stats section */}
        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          className="about-stats-container"
        >
          <Row gutter={[24, 24]}>
            {aboutStats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="about-stat-item">
                    <div className="about-stat-icon">{stat.icon}</div>
                    <Title level={2} className="about-stat-value">
                      {stat.value}
                    </Title>
                    <Text className="about-stat-label">{stat.label}</Text>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Timeline section */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          animate={timelineInView ? "visible" : "hidden"}
          className="about-timeline"
        >
          <Title level={3} className="timeline-title">
            Our Journey
          </Title>

          <div className="timeline-container">
            {companyTimeline.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${
                  index % 2 === 0 ? "timeline-left" : "timeline-right"
                }`}
                variants={itemVariants}
              >
                <div className="timeline-content">
                  <span className="timeline-date">{item.date}</span>
                  <h3 className="timeline-event">{item.event}</h3>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team section */}
        <motion.div
          ref={teamRef}
          variants={containerVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          className="team-section"
        >
          <Title level={3} className="team-title">
            Meet Our Team
          </Title>

          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} sm={8} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="team-card">
                    <div className="team-member-avatar">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{ width: 120, height: 120, borderRadius: "50%" }}
                      />
                    </div>
                    <Title level={4} className="team-member-name">
                      {member.name}
                    </Title>
                    <Text className="team-member-role">{member.role}</Text>
                    <Paragraph className="team-member-bio">
                      {member.bio}
                    </Paragraph>

                    <div className="team-social-links">
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
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
