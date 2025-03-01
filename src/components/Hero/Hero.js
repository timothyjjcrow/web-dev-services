import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Row, Col } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { RocketOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./Hero.css";

const { Title, Paragraph } = Typography;

// Simple game component: BouncingBallGame
const BouncingBallGame = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 15,
      dx: 2,
      dy: 2,
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "#42a5f5";
      ctx.fill();
      ctx.closePath();

      // Update ball position
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Bounce off walls
      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      // Center the ball after resize
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
    };

    resizeCanvas();
    render();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="game-canvas" />;
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize to detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="hero-section" id="home">
      {/* Gradient overlay */}
      <div className="hero-overlay"></div>

      {/* Animated background elements */}
      <div className="hero-background">
        <div className="hero-circles">
          <div className="hero-circle circle-1"></div>
          <div className="hero-circle circle-2"></div>
          <div className="hero-circle circle-3"></div>
        </div>
        <div className="hero-grid"></div>
        {/* Animated particles for visual interest */}
        <div className="hero-particles">
          {[...Array(isMobile ? 8 : 15)].map((_, index) => (
            <div
              key={index}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <Row align="middle" className="hero-row">
          <Col xs={24} md={12} className="hero-content-col">
            <motion.div
              className="hero-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="hero-badge">
                <span>Web Development Solutions</span>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Title className="hero-title">
                  Transform Your <span className="highlight">Digital</span>{" "}
                  Presence
                </Title>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Paragraph className="hero-description">
                  We build exceptional web experiences that combine stunning
                  design with cutting-edge technology to help your business
                  stand out in the digital landscape.
                </Paragraph>
              </motion.div>
              <motion.div className="hero-buttons" variants={itemVariants}>
                <Button
                  type="primary"
                  className="hero-button primary"
                  icon={<RocketOutlined />}
                >
                  <Link
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    Start Your Project
                  </Link>
                </Button>
                <Button
                  className="hero-button secondary"
                  icon={<ArrowRightOutlined />}
                >
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
              </motion.div>
              {/* Tech tags */}
              <motion.div className="hero-tech-tags" variants={itemVariants}>
                <div className="tech-tag">React</div>
                <div className="tech-tag">Vue</div>
                <div className="tech-tag">Node.js</div>
                <div className="tech-tag">Shopify</div>
                <div className="tech-tag">WordPress</div>
              </motion.div>
            </motion.div>
          </Col>

          <Col xs={24} md={12} className="hero-image-col">
            <motion.div
              className="hero-game-code-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Code snippet container */}
              <div className="hero-code-container">
                <div className="code-header">
                  <div className="code-buttons">
                    <span className="code-button"></span>
                    <span className="code-button"></span>
                    <span className="code-button"></span>
                  </div>
                  <div className="code-title">BouncingBallGame.js</div>
                </div>
                <div className="code-editor">
                  <div className="code-line">
                    <span className="code-keyword">import</span> React, {"{"}{" "}
                    useRef, useEffect {"}"}{" "}
                    <span className="code-keyword">from</span>{" "}
                    <span className="code-string">'react'</span>;
                  </div>
                  <div className="code-line">
                    <span className="code-keyword">const</span> BouncingBallGame{" "}
                    <span className="code-operator">=</span> (){" "}
                    <span className="code-operator">=&gt;</span> {"{"}
                  </div>
                  <div className="code-line indent">
                    <span className="code-keyword">const</span> canvasRef{" "}
                    <span className="code-operator">=</span>{" "}
                    <span className="code-function">useRef</span>(null);
                  </div>
                  <div className="code-line indent">
                    <span className="code-keyword">useEffect</span>((){" "}
                    <span className="code-operator">=&gt;</span> {"{"}
                  </div>
                  <div className="code-line indent double">
                    <span className="code-comment">
                      // Initialize canvas and ball
                    </span>
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">const</span> canvas{" "}
                    <span className="code-operator">=</span> canvasRef.current;
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">const</span> ctx{" "}
                    <span className="code-operator">=</span> canvas.getContext(
                    <span className="code-string">'2d'</span>);
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">let</span> ball = {"{"} x:
                    canvas.width / 2, y: canvas.height / 2, radius: 15, dx: 2,
                    dy: 2 {"}"};
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">let</span> animationFrameId;
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">const</span> render = (){" "}
                    <span className="code-operator">=&gt;</span> {"{"}
                  </div>
                  <div className="code-line indent triple">
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                  </div>
                  <div className="code-line indent triple">
                    ctx.beginPath();
                  </div>
                  <div className="code-line indent triple">
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                  </div>
                  <div className="code-line indent triple">
                    ctx.fillStyle ={" "}
                    <span className="code-string">'#42a5f5'</span>;
                  </div>
                  <div className="code-line indent triple">ctx.fill();</div>
                  <div className="code-line indent triple">
                    ctx.closePath();
                  </div>
                  <div className="code-line indent triple">
                    ball.x += ball.dx; ball.y += ball.dy;
                  </div>
                  <div className="code-line indent triple">
                    <span className="code-comment">// Bounce off walls</span>
                  </div>
                  <div className="code-line indent triple">
                    <span className="code-keyword">if</span> (ball.x +
                    ball.radius > canvas.width || ball.x - ball.radius {"<"} 0)
                    ball.dx = -ball.dx;
                  </div>
                  <div className="code-line indent triple">
                    <span className="code-keyword">if</span> (ball.y +
                    ball.radius > canvas.height || ball.y - ball.radius {"<"} 0)
                    ball.dy = -ball.dy;
                  </div>
                  <div className="code-line indent triple">
                    animationFrameId = requestAnimationFrame(render);
                  </div>
                  <div className="code-line indent double">{"}"};</div>
                  <div className="code-line indent double">
                    <span className="code-comment">
                      // Handle canvas resize
                    </span>
                  </div>
                  <div className="code-line indent double">
                    <span className="code-keyword">const</span> resizeCanvas =
                    () <span className="code-operator">=&gt;</span> {"{"}
                  </div>
                  <div className="code-line indent triple">
                    canvas.width = canvas.parentElement.offsetWidth;
                  </div>
                  <div className="code-line indent triple">
                    canvas.height = canvas.parentElement.offsetHeight;
                  </div>
                  <div className="code-line indent triple">
                    ball.x = canvas.width / 2; ball.y = canvas.height / 2;
                  </div>
                  <div className="code-line indent double">{"}"};</div>
                  <div className="code-line indent double">resizeCanvas();</div>
                  <div className="code-line indent double">render();</div>
                  <div className="code-line indent double">
                    window.addEventListener(
                    <span className="code-string">'resize'</span>,
                    resizeCanvas);
                  </div>
                  <div className="code-line indent">
                    <span className="code-keyword">return</span> (){" "}
                    <span className="code-operator">=&gt;</span> {"{"}
                  </div>
                  <div className="code-line indent triple">
                    window.removeEventListener(
                    <span className="code-string">'resize'</span>,
                    resizeCanvas);
                  </div>
                  <div className="code-line indent triple">
                    cancelAnimationFrame(animationFrameId);
                  </div>
                  <div className="code-line indent">{"}"};</div>
                  <div className="code-line">
                    <span className="code-keyword">return</span> &lt;canvas
                    ref=&#123;canvasRef&#125; className="game-canvas" /&gt;;
                  </div>
                  <div className="code-line">};</div>
                  <div className="code-line"></div>
                  <div className="code-line">
                    <span className="code-keyword">export default</span>{" "}
                    BouncingBallGame;
                  </div>
                </div>
              </div>
              {/* Interactive game container */}
              <div className="hero-game-container">
                <BouncingBallGame />
              </div>
            </motion.div>
          </Col>
        </Row>
      </div>

      {/* Wave separator */}
      <div className="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#000000"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,165.3C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
