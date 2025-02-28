// src/components/InnovativeApproach/InnovativeApproach.js
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Button, Card } from "antd";
import { motion, useAnimation, useTransform, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  BulbOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./InnovativeApproach.css";

const { Title, Paragraph } = Typography;

const InnovativeApproach = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const containerRef = useRef(null);

  // Track mouse position for interactive elements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  };

  // Animation controls
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Innovative approaches data
  const approaches = [
    {
      icon: <BulbOutlined className="approach-icon" />,
      title: "Design Thinking",
      description:
        "We approach every challenge with a user-first mindset, crafting solutions that solve real problems while delighting users.",
      color: "#FF6B6B",
      delay: 0.1,
    },
    {
      icon: <RocketOutlined className="approach-icon" />,
      title: "Rapid Prototyping",
      description:
        "Turn concepts into reality faster with our iterative approach that delivers functional prototypes in record time.",
      color: "#4ECDC4",
      delay: 0.2,
    },
    {
      icon: <ThunderboltOutlined className="approach-icon" />,
      title: "Performance Focus",
      description:
        "Speed is more than a feature—it's a requirement. We optimize every line of code for lightning-fast experiences.",
      color: "#FFD166",
      delay: 0.3,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      className="innovative-section"
      id="innovative-approach"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <div className="innovative-background">
        {/* Interactive background gradient */}
        <div
          className="interactive-gradient"
          style={{
            background: `radial-gradient(circle at ${
              50 + mousePosition.x * 20
            }% ${
              50 + mousePosition.y * 20
            }%, rgba(89, 131, 252, 0.2) 0%, rgba(41, 53, 86, 0.1) 30%, transparent 70%)`,
          }}
        ></div>

        {/* Animated shapes */}
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className={`floating-shape shape-${index + 1}`}
            animate={{
              x: [0, 10, -5, 8, 0],
              y: [0, -8, 5, -10, 0],
              rotate: [0, 5, -5, 2, 0],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="grid-pattern"></div>
      </div>

      <div className="innovative-container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="innovative-content"
        >
          <motion.div className="section-header" variants={itemVariants}>
            <span className="section-label">
              <span className="label-text">Our Approach</span>
            </span>
            <Title className="section-title">
              Where <span className="highlight">Innovation</span> Meets
              Execution
            </Title>
            <Paragraph className="section-description">
              We don't just build websites—we craft digital experiences that
              push boundaries and set new standards in web development.
            </Paragraph>
          </motion.div>

          <Row gutter={[32, 32]} className="approach-row">
            {approaches.map((approach, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  variants={itemVariants}
                  custom={index}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Card className="approach-card">
                    <div
                      className="approach-icon-wrapper"
                      style={{
                        backgroundColor: `${approach.color}15`,
                        borderColor: `${approach.color}30`,
                      }}
                    >
                      {approach.icon}
                    </div>
                    <h3 className="approach-title">{approach.title}</h3>
                    <p className="approach-description">
                      {approach.description}
                    </p>

                    <div className="approach-shapes">
                      <div
                        className="approach-shape"
                        style={{ backgroundColor: `${approach.color}20` }}
                      ></div>
                      <div
                        className="approach-shape"
                        style={{ backgroundColor: `${approach.color}15` }}
                      ></div>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <motion.div className="interactive-demo" variants={itemVariants}>
            <div className="demo-container">
              <div className="demo-content">
                <div className="demo-text">
                  <Title level={3}>See Our Approach In Action</Title>
                  <Paragraph>
                    Discover how our innovative thinking transforms digital
                    challenges into exceptional web experiences.
                  </Paragraph>
                  <Button type="primary" className="demo-button">
                    <span>View Case Studies</span>
                    <ArrowRightOutlined />
                  </Button>
                </div>

                <div className="demo-visual">
                  <div className="interactive-sphere">
                    <div className="sphere-core"></div>
                    <div
                      className="sphere-orbit orbit-1"
                      style={{
                        transform: `rotateX(${
                          20 + mousePosition.y * 10
                        }deg) rotateY(${mousePosition.x * 20}deg)`,
                      }}
                    >
                      <div className="orbit-dot"></div>
                    </div>
                    <div
                      className="sphere-orbit orbit-2"
                      style={{
                        transform: `rotateX(${
                          60 + mousePosition.y * 15
                        }deg) rotateY(${20 + mousePosition.x * 30}deg)`,
                      }}
                    >
                      <div className="orbit-dot"></div>
                    </div>
                    <div
                      className="sphere-orbit orbit-3"
                      style={{
                        transform: `rotateX(${
                          -30 + mousePosition.y * 20
                        }deg) rotateY(${45 + mousePosition.x * 40}deg)`,
                      }}
                    >
                      <div className="orbit-dot"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovativeApproach;
