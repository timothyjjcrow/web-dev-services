// src/components/FlatEarth/FlatEarth.js
import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Card, Button, Tooltip } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GlobalOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  CompassOutlined,
  ExperimentOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import "./FlatEarth.css";

const { Title, Paragraph, Text } = Typography;

const FlatEarth = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [hoveredFeature, setHoveredFeature] = useState(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const featureCardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // "Evidence" data
  const flatEarthFeatures = [
    {
      icon: <CompassOutlined className="feature-icon" />,
      title: "The Horizon Always Rises",
      description:
        "No matter how high you go, the horizon always mysteriously rises to eye level. This is because the earth is actually a cosmic frisbee.",
      color: "#00f5a0",
    },
    {
      icon: <ExperimentOutlined className="feature-icon" />,
      title: "Water Finds Its Level",
      description:
        "If you pour water on any surface, it always levels out flat. Just like the oceans on our definitely-not-spherical planet.",
      color: "#26d0ce",
    },
    {
      icon: <RocketOutlined className="feature-icon" />,
      title: "Edge of the World Tours",
      description:
        "Book our exclusive tour packages to the edge of the world! (Legal disclaimer: Tours always get mysteriously redirected due to 'weather conditions').",
      color: "#4facfe",
    },
  ];

  return (
    <section className="flat-earth-section" id="flat-earth" ref={ref}>
      <div className="flat-earth-background">
        <div className="flat-earth-stars"></div>
        <div className="flat-earth-shooting-star"></div>
        <div className="flat-earth-glow"></div>
      </div>

      <motion.div
        className="flat-earth-container"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="flat-earth-header" variants={itemVariants}>
          <Title className="flat-earth-title">
            Our <span className="flat-earth-highlight">Flat Earth</span>{" "}
            Division
            <Tooltip
              title="Just kidding! This is satire."
              className="disclaimer-tooltip"
            >
              <QuestionCircleOutlined className="disclaimer-icon" />
            </Tooltip>
          </Title>
          <Paragraph className="flat-earth-description">
            While our main team builds websites that are well-rounded, our
            shadow division explores alternative cosmic geometries.
          </Paragraph>
          <div className="flat-earth-divider">
            <span className="flat-earth-divider-dot"></span>
            <span className="flat-earth-divider-line"></span>
            <span className="flat-earth-divider-dot"></span>
          </div>
        </motion.div>

        <Row gutter={[48, 48]} className="flat-earth-content-row">
          <Col xs={24} lg={12}>
            <motion.div
              className="flat-earth-illustration-container"
              variants={itemVariants}
            >
              <div className="flat-earth-disc">
                <div className="flat-earth-surface">
                  <div className="continent continent-1"></div>
                  <div className="continent continent-2"></div>
                  <div className="continent continent-3"></div>
                  <div className="ocean"></div>
                  <div className="ice-wall"></div>
                </div>
                <div className="turtle-container">
                  <div className="cosmic-turtle"></div>
                </div>
              </div>
              <div className="flat-earth-shadow"></div>
              <div className="flat-earth-labels">
                <span className="earth-label north-pole">North Pole</span>
                <span className="earth-label ice-wall-label">Ice Wall</span>
                <span className="earth-label turtle-label">Giant Turtle</span>
              </div>
            </motion.div>
          </Col>

          <Col xs={24} lg={12}>
            <motion.div className="flat-earth-facts" variants={itemVariants}>
              <motion.div className="flat-earth-intro" variants={itemVariants}>
                <GlobalOutlined className="flat-earth-intro-icon" />
                <Paragraph className="flat-earth-intro-text">
                  Our cutting-edge research division explores the *ahem*
                  "alternative" cosmic model that the Earth is actually flat.
                  Why believe your eyes when you can believe memes? Join us on
                  this satirical journey!
                </Paragraph>
              </motion.div>

              <div className="flat-earth-features">
                {flatEarthFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={featureCardVariants}
                    className={`feature-card ${
                      hoveredFeature === index ? "hovered" : ""
                    }`}
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div
                      className="feature-icon-container"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}11)`,
                        borderColor: `${feature.color}66`,
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <Title level={5} className="feature-title">
                        {feature.title}
                      </Title>
                      <Paragraph className="feature-description">
                        {feature.description}
                      </Paragraph>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="flat-earth-cta" variants={itemVariants}>
                <Button type="primary" className="flat-earth-button">
                  Learn More <ArrowRightOutlined />
                </Button>
                <Text className="flat-earth-disclaimer">
                  *Disclaimer: This section is satirical. We believe in science,
                  spherical planets, and reality. No flat-earthers were harmed
                  in the making of this website.
                </Text>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>
    </section>
  );
};

export default FlatEarth;
