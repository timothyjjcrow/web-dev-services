// src/components/Hero/Hero.js
import React from "react";
import { Typography, Button, Badge } from "antd";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import AnimatedBackground from "./common/AnimatedBackground";
import "./Hero.css";

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      <AnimatedBackground />
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge.Ribbon text="Professional" color="blue">
            <Title className="hero-title">Web Development Services</Title>
          </Badge.Ribbon>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Paragraph className="hero-description">
              We create stunning, high-performance websites and applications
              that help businesses thrive in the digital world.
            </Paragraph>
          </motion.div>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
