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
  CompassOutlined,
  WarningOutlined,
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

  // Use a simple approach to detect mobile devices
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Interactive earth model state
  const earthContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  // Start with a slight tilt
  const [earthRotation, setEarthRotation] = useState({ x: 5, y: 0 });

  // Handle mouse movement for the parallax tilt effect
  const handleMouseMove = (e) => {
    if (!earthContainerRef.current || isMobile) return; // Skip complex calculations on mobile

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
    let baseRotationY = 0;

    const animate = () => {
      // Slower rotation on mobile for better performance
      baseRotationY += isMobile ? 0.01 : 0.03;

      setEarthRotation((prev) => {
        // Simpler animation logic for mobile
        if (isMobile) {
          return {
            x: 5,
            y: baseRotationY,
          };
        }

        // Regular animation logic for desktop
        const targetX = isHoveringRef.current
          ? -mousePositionRef.current.y * 15
          : 5;
        const targetY = isHoveringRef.current
          ? baseRotationY + mousePositionRef.current.x * 15
          : baseRotationY;

        return {
          x: prev.x + (targetX - prev.x) * 0.05, // Slower transition
          y: prev.y + (targetY - prev.y) * 0.05,
        };
      });

      frameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameId);
  }, [isMobile]); // Add isMobile as a dependency

  // Framer-motion variants for fade-in & staggered child animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.05 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: isMobile ? 10 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: isMobile ? 0.5 : 0.7, ease: "easeOut" },
    },
  };

  // Creative services data
  const creativeServices = [
    {
      icon: <GlobalOutlined className="service-icon" />,
      title: "NASA-Proof Web Design",
      description:
        "Our websites are so flat, even satellite imagery can't detect any curvature.",
      bgColor: "rgba(0, 245, 160, 0.1)",
      borderColor: "rgba(0, 245, 160, 0.3)",
    },
    {
      icon: <ExperimentOutlined className="service-icon" />,
      title: "Ice Wall Security",
      description:
        "We protect your data behind impenetrable security - like the ice wall at the edge of our definitely-flat world.",
      bgColor: "rgba(0, 217, 245, 0.1)",
      borderColor: "rgba(0, 217, 245, 0.3)",
    },
    {
      icon: <CodeOutlined className="service-icon" />,
      title: "Turtle-Stack Architecture",
      description:
        "Our platforms are stable because they're built on the back of a giant cosmic turtle. Much better than the cloud.",
      bgColor: "rgba(122, 89, 249, 0.1)",
      borderColor: "rgba(122, 89, 249, 0.3)",
    },
  ];

  // Render only a subset of particles on mobile
  const renderParticles = () => {
    const particleCount = isMobile ? 5 : 25; // Fewer particles on mobile

    return [...Array(particleCount)].map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 2}px`,
          height: `${1 + Math.random() * 2}px`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      ></div>
    ));
  };

  return (
    <section className="creative-section" id="flat-earth" ref={ref}>
      <div className="creative-bg">
        <div className="stars">
          {/* Fewer shooting stars with longer animation duration */}
          {[...Array(isMobile ? 1 : 2)].map((_, i) => (
            <div
              key={i}
              className="shooting-star"
              style={{
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 15}s`,
                width: `${150 + Math.random() * 50}px`,
              }}
            ></div>
          ))}
          {/* Render optimized number of stars */}
          {renderParticles()}
        </div>
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
              <span className="label-icon">🌓</span>
              <span className="label-text">Truth Section</span>
            </div>
            <Title className="section-title">
              The Earth is <span className="highlight">DEFINITELY Flat</span>
            </Title>
            <Paragraph className="section-description">
              Our web development is so cutting-edge, we've finally discovered
              what NASA has been hiding all along. Join us on a journey to the
              edge of... design possibilities.
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
                      y: isMobile ? -3 : -5,
                      x: isMobile ? 3 : 5,
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
                      Our flat earth model is so flat you could use it as a
                      table...
                    </span>
                  </div>
                  <Button className="cta-button" type="primary">
                    <span>Return to Reality</span>
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
                onMouseEnter={() => !isMobile && setIsHovering(true)}
                onMouseLeave={() => !isMobile && setIsHovering(false)}
                onMouseMove={handleMouseMove}
                onTouchStart={() => isMobile && setIsHovering(true)} // Add touch support
                onTouchEnd={() => isMobile && setIsHovering(false)}
              >
                {/* Cursor glow effect - only on desktop */}
                {isHovering && !isMobile && (
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
                      {/* Continents with better shapes */}
                      <div className="continent continent-1"></div>
                      <div className="continent continent-2"></div>
                      <div className="continent continent-3"></div>
                      <div className="continent continent-center"></div>

                      {/* Ice wall instead of ice ring */}
                      <div className="ice-wall"></div>

                      {/* Fun map elements */}
                      <div className="map-element dragons-text">
                        Here be dragons
                      </div>
                      <div className="map-element sea-monster">
                        <div
                          className="monster-body"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23006699'%3E%3Cpath d='M435.1 89.04c13 .57 27.6 6.63 43.9 18.92L448 160l67.96-12.83c-8.75 16.07-18.4 30.57-29.32 43.51L352 352c-19.13 19.13-45.02 29.84-71.87 29.96-41.53-26.3-88.28-36.27-134.7-32.27L77.94 486.17C69.32 478.77 64 467.23 64 455.02V95.37c0-8.7 3.4-16.8 9.6-23 18.45-18.45 49.27-19.51 69.14-2.1l116.54 101.94c12.76-3.8 25.4-3.65 36.49.85 8.02 3.23 15.55 8.58 22.23 15.28 8.37 8.37 14.39 18.31 17.88 28.37 15.63-22.31 44.55-27.47 65.12-12.66l42.55-48.55c-16.81-22.53-16.81-52.41 0-74.95 3.45-4.64 7.34-8.82 11.56-12.47-6.92-11-10.61-21.51-13.47-31.74-1.46-5.23-2.7-10.4-3.91-14.75-3.4-12.2-3.16-25.22 1.05-36.49 5.18-13.84 15.86-24.97 32.27-32.26 18.53-8.21 39.2-7.49 57.29 2.14 4.24 2.22 7.46 6.5 8.17 11.18.71 4.69-.88 9.42-4.3 12.64-13.16 12.43-27.56 18.29-41.55 17.92l-5.11-.49c-13.39-.61-22.74-.87-22.74-.87z'/%3E%3C/svg%3E")`,
                          }}
                        ></div>
                      </div>
                      <div className="map-element edge-warning">!</div>
                      <div className="map-element compass">
                        <div
                          className="compass-inner"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%23f0d080'%3E%3Cpath d='M464 256c0-114.9-93.1-208-208-208S48 141.1 48 256s93.1 208 208 208 208-93.1 208-208zm-208 96c-52.9 0-96-43.1-96-96s43.1-96 96-96 96 43.1 96 96-43.1 96-96 96zm118.5-32.8l-59.3-59.3c6.8-14.8 6.7-32.3-.2-47.2-7-15.1-20.3-25.5-35.3-29.3-18-4.6-35.8.4-49.1 11.1L301 99.7c10.4-1.8 21.1-2.7 32.1-2.7 5.7 0 11.4.3 17 .9l-24.2 24.2 20.8 20.8 33.5-33.5c56.6 24.9 96.6 82.2 96.6 148.5 0 28.4-7.3 55.1-20.2 78.3l-46.1-46zm-155.9 10.3l-20.8-20.8-33.4 33.5c-56.7-24.9-96.7-82.1-96.7-148.5 0-28.4 7.3-55.2 20.2-78.3l46.1 46 59.3 59.3c-6.8 14.8-6.7 32.3.2 47.2 7 15.1 20.3 25.5 35.3 29.3 4.9 1.2 9.9 1.8 14.8 1.8 13.9 0 27.1-5.6 36.5-15.8l-38.4-38.4c-11.2 7.3-25.6 7.3-36.8.1l25.5-25.5c-2.5-5.6-3.9-11.8-3.9-18.4 0-5.2.9-10.3 2.7-15.2l-99.7 99.7c-1.8 10.4-2.7 21.1-2.7 32.1 0 5.7.3 11.4.9 17l24.2-24.2 20.8 20.8-33.5 33.5c24.9 56.7 82.2 96.7 148.5 96.7 28.4 0 55.2-7.3 78.3-20.2l-46-46.1-59.3-59.3z'/%3E%3C/svg%3E")`,
                          }}
                        ></div>
                      </div>

                      {/* Render fewer clouds on mobile */}
                      {!isMobile && (
                        <>
                          <div className="cloud cloud-1"></div>
                          <div className="cloud cloud-2"></div>
                          <div className="cloud cloud-3"></div>
                        </>
                      )}
                      {isMobile && <div className="cloud cloud-1"></div>}

                      {/* Lighting effect */}
                      <div className="earth-lighting"></div>
                    </div>
                    <div className="earth-edge"></div>
                  </div>

                  {/* Turtle supporting the earth */}
                  <div className="turtle-support">
                    <div
                      className="turtle-body"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' fill='%2326a96c'%3E%3Cpath d='M368 416h-64.6c-24.6 0-45-11-62.7-28.5-3.1-3-6-6.1-8.7-9.4-2.8 3.3-5.6 6.4-8.7 9.4-17.7 17.5-38.1 28.5-62.7 28.5H96c-19 0-32.9-5-41-10.8-7.1-5-7.9-10-7.9-13.2 0-35.4 35.5-75.1 87.9-75.1 25.5 0 51 7.7 69.1 22 3 2.2 5.9 4.7 8.7 7.4 1 .9 1.9 1.9 2.8 2.9 1.7 1.9 4.3 1.9 6 0 .9-1 1.9-2 2.8-2.9 2.8-2.7 5.7-5.2 8.7-7.4 18.1-14.3 43.6-22 69.1-22 52.4 0 87.9 39.7 87.9 75.1 0 3.2-.8 8.2-7.9 13.2-8.1 5.8-22 10.8-41 10.8zm-64.6-128c-39.3 0-82.8 32.2-82.8 67.9 0 1.7.5 2 .7 2.1.7.5 3.5 2 15.3 2H304c14.9 0 25.6-5.6 36.3-16.2 7.7-7.6 13.7-17.3 19.5-28.7-16.6-15.4-39.3-27.1-56.4-27.1zm-159.4 67.9c0-35.7-43.5-67.9-82.8-67.9-17.1 0-39.8 11.7-56.4 27.1 5.8 11.4 11.8 21.1 19.5 28.7C34.1 356.4 44.8 362 59.7 362h66.4c11.8 0 14.6-1.5 15.3-2 .2-.1.6-.4.6-2.1zM182.4 240c23.6 0 45.4-7.2 64.5-21.7 17.4-13.2 31.5-31.5 41.5-54.1 2-4.6-1.5-9.8-6.6-9.8h-202c-5 0-8.5 5.2-6.6 9.8 10 22.6 24.2 40.9 41.5 54.1 19.3 14.5 41 21.7 64.5 21.7zm-73.1-49.6c17.8 0 32.5-14.4 32.5-32.3 0-8.5-3.2-16.3-8.9-22.2-2.9-3-7.8-3-10.6.1-31.7 34.6-32.1 35-32.1 35.5 0 9.4 7.8 18.9 19.1 18.9zm146.2 0c11.3 0 19.1-9.5 19.1-18.9 0-.5-.4-.9-32.1-35.5-2.8-3.1-7.7-3.1-10.6-.1-5.7 5.9-8.9 13.7-8.9 22.2 0 17.9 14.6 32.3 32.5 32.3z'/%3E%3C/svg%3E")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>

                  <div className="shadow"></div>
                </div>

                <Tooltip title="Don't tell NASA you've seen this - they'll come for your internet connection!">
                  <div className="info-marker">
                    <InfoCircleOutlined />
                  </div>
                </Tooltip>

                <div className="interaction-hint">
                  <span className="hint-text">
                    {isMobile
                      ? "Tap to see the truth!"
                      : "Hover to find truth (but don't sail too close to the edge!)"}
                  </span>
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
