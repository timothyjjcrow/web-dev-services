// src/components/FlatEarth/FlatEarth.js
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Button, Tooltip } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExperimentOutlined,
  InfoCircleOutlined,
  GlobalOutlined,
  CodeOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import "./FlatEarth.css";

const { Title, Paragraph } = Typography;

const FlatEarth = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Interactive earth model state
  const earthContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // Start with a slight tilt
  const [earthRotation, setEarthRotation] = useState({ x: 10, y: 0 });

  // Handle mouse movement for the parallax tilt effect
  const handleMouseMove = (e) => {
    if (!earthContainerRef.current) return;
    const rect = earthContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Update the cursor glow position
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    // Update the mouse position for the effect
    setMousePosition({ x, y });
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Framer-motion variants for fade-in & staggered child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Creative services data
  const creativeServices = [
    {
      icon: <GlobalOutlined className="service-icon" />,
      title: "Interdimensional Web Design",
      description:
        "We design websites that look amazing in this dimension and all parallel ones.",
      bgColor: "rgba(0, 245, 160, 0.1)",
      borderColor: "rgba(0, 245, 160, 0.3)",
    },
    {
      icon: <ExperimentOutlined className="service-icon" />,
      title: "Gravity-Defying UX",
      description:
        "User experiences so smooth, they seem to defy the laws of physics.",
      bgColor: "rgba(0, 217, 245, 0.1)",
      borderColor: "rgba(0, 217, 245, 0.3)",
    },
    {
      icon: <CodeOutlined className="service-icon" />,
      title: "Quantum Code Architecture",
      description:
        "Our code exists in multiple states simultaneously until a user observes it.",
      bgColor: "rgba(122, 89, 249, 0.1)",
      borderColor: "rgba(122, 89, 249, 0.3)",
    },
  ];

  // Use refs to always have the latest values for hover and mousePosition
  const isHoveringRef = useRef(isHovering);
  const mousePositionRef = useRef(mousePosition);
  useEffect(() => {
    isHoveringRef.current = isHovering;
    mousePositionRef.current = mousePosition;
  }, [isHovering, mousePosition]);

  // Continuous animation loop for a dynamic flat earth model in space.
  // When not hovering, the earth gently rotates on its own.
  // When hovering, the mouse offsets add a subtle tilt.
  useEffect(() => {
    let frameId;
    let baseRotationY = 0; // Base rotation on Y (increases over time)

    const animate = () => {
      baseRotationY += 0.2; // Constant rotation speed for a smooth in-space effect

      setEarthRotation((prev) => {
        // Calculate target rotations:
        // If hovering, add mouse offset; otherwise, use default base values.
        const targetX = isHoveringRef.current
          ? -mousePositionRef.current.y * 20
          : 10;
        const targetY = isHoveringRef.current
          ? baseRotationY + mousePositionRef.current.x * 20
          : baseRotationY;
        return {
          x: prev.x + (targetX - prev.x) * 0.08,
          y: prev.y + (targetY - prev.y) * 0.08,
        };
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="creative-section" id="flat-earth" ref={ref}>
      <div className="creative-bg">
        <div className="stars"></div>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 3}s`,
              width: `${100 + Math.random() * 50}px`,
            }}
          ></div>
        ))}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="creative-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="creative-content"
        >
          <motion.div className="section-header" variants={itemVariants}>
            <div className="section-label">
              <span className="label-icon">✨</span>
              <span className="label-text">Creative Corner</span>
            </div>
            <Title className="section-title">
              Where Creativity Meets{" "}
              <span className="highlight">Imagination</span>
            </Title>
            <Paragraph className="section-description">
              At Web Dev Services, we don't just build websites - we create
              digital experiences that push boundaries and challenge
              conventional thinking.
            </Paragraph>
          </motion.div>

          <Row gutter={[48, 48]} className="content-row">
            <Col xs={24} lg={12} xl={14}>
              <motion.div
                className="creative-cards"
                variants={containerVariants}
              >
                {creativeServices.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="creative-card"
                    whileHover={{
                      y: -5,
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div
                      className="card-icon-wrapper"
                      style={{
                        background: service.bgColor,
                        borderColor: service.borderColor,
                      }}
                    >
                      {service.icon}
                    </div>
                    <div className="card-content">
                      <h4 className="card-title">{service.title}</h4>
                      <p className="card-description">{service.description}</p>
                    </div>
                  </motion.div>
                ))}

                <motion.div className="cta-container" variants={itemVariants}>
                  <div className="disclaimer">
                    <InfoCircleOutlined className="disclaimer-icon" />
                    <span className="disclaimer-text">
                      Our sense of humor is as strong as our code. While these
                      services sound fantastical, our actual development skills
                      are very real!
                    </span>
                  </div>
                  <Button className="cta-button" type="primary">
                    <span>Back to Reality</span>
                    <ArrowRightOutlined />
                  </Button>
                </motion.div>
              </motion.div>
            </Col>

            <Col xs={24} lg={12} xl={10}>
              <motion.div
                ref={earthContainerRef}
                className="earth-container"
                variants={itemVariants}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
              >
                {/* Cursor glow effect */}
                {isHovering && (
                  <div
                    className="cursor-glow"
                    style={{
                      left: `${cursorPosition.x}px`,
                      top: `${cursorPosition.y}px`,
                    }}
                  />
                )}

                <div className="earth-atmosphere"></div>
                <div
                  className="earth-model"
                  style={{
                    transform: `rotateY(${
                      earthRotation.y
                    }deg) rotateX(${-earthRotation.x}deg)`,
                  }}
                >
                  <div className="earth-disc">
                    <div className="earth-front">
                      <div className="continent continent-1"></div>
                      <div className="continent continent-2"></div>
                      <div className="continent continent-3"></div>
                      <div className="ice-ring"></div>
                      {/* Cloud layers */}
                      <div className="cloud cloud-1"></div>
                      <div className="cloud cloud-2"></div>
                      <div className="cloud cloud-3"></div>
                      {/* Lighting effect */}
                      <div className="earth-lighting"></div>
                    </div>
                    <div className="earth-edge"></div>
                  </div>

                  <div className="support-column"></div>
                  <div className="shadow"></div>
                  <div className="earth-particles">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="earth-particle"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                        }}
                      />
                    ))}
                  </div>

                  <Tooltip title="Yes, this is our tongue-in-cheek section. We promise our websites are well-rounded!">
                    <div className="info-marker">
                      <InfoCircleOutlined />
                    </div>
                  </Tooltip>
                </div>

                <div className="interaction-hint">
                  <span className="hint-text">Hover to explore</span>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </section>
  );
};

export default FlatEarth;
