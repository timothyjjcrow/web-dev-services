// src/components/Portfolio/Portfolio.js
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Typography, Button, Tabs, Empty } from "antd";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRightOutlined,
  SearchOutlined,
  GithubOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./Portfolio.css";

// Portfolio data would ideally come from a data file
// For now, we'll define it here
const portfolioData = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    category: "e-commerce",
    image:
      "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Complete redesign and development of a high-traffic online store with custom checkout flow.",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Financial Dashboard",
    category: "web-app",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Real-time financial analytics dashboard with interactive charts and data visualization.",
    technologies: ["Vue.js", "D3.js", "Firebase", "TailwindCSS"],
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Travel Blog Platform",
    category: "website",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Content-focused travel blog with advanced media management and location integration.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    category: "web-app",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Progressive web app for tracking workouts with offline capabilities and visual progress tracking.",
    technologies: ["React", "PWA", "IndexedDB", "Chart.js"],
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Real Estate Listings",
    category: "website",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Property listing platform with advanced search, filtering, and virtual tour integration.",
    technologies: ["Next.js", "PostgreSQL", "Google Maps API", "Vercel"],
    link: "#",
  },
  {
    id: 6,
    title: "Custom Shopify Theme",
    category: "e-commerce",
    image:
      "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    description:
      "Bespoke Shopify theme development for a luxury fashion brand with custom product showcasing.",
    technologies: ["Shopify", "Liquid", "JavaScript", "SCSS"],
    link: "#",
  },
];

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const Portfolio = () => {
  // State for filtering
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(portfolioData);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Animation controls
  const headerControls = useAnimation();
  const featuredControls = useAnimation();
  const gridControls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: isMobile ? 0.05 : 0.1,
  });

  // Parallax effect reference
  const parallaxRef = useRef(null);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollY = window.scrollY;
        const elements =
          parallaxRef.current.querySelectorAll(".parallax-element");

        elements.forEach((el) => {
          const speed = el.getAttribute("data-speed") || 0.1;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(portfolioData);
    } else {
      setFilteredProjects(
        portfolioData.filter((project) => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Start animation when section comes into view
  useEffect(() => {
    if (inView) {
      headerControls.start("visible");
      featuredControls.start("visible");
      gridControls.start("visible");
    }
  }, [headerControls, featuredControls, gridControls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  // Unique key to force complete re-animation on category change
  const [animationKey, setAnimationKey] = useState(0);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Increment animation key to force re-animation
    setAnimationKey((prevKey) => prevKey + 1);
  };

  // Featured projects (for the spotlight section)
  const featuredProjects = portfolioData.filter((project) => project.featured);

  return (
    <section className="portfolio-section" id="portfolio" ref={parallaxRef}>
      {/* Decorative elements */}
      <div className="portfolio-background">
        <div className="portfolio-grid"></div>
        <div className="portfolio-blobs">
          <div
            className="blob blob-1 parallax-element"
            data-speed="-0.05"
          ></div>
          <div className="blob blob-2 parallax-element" data-speed="0.03"></div>
          <div
            className="blob blob-3 parallax-element"
            data-speed="-0.02"
          ></div>
        </div>
        <div className="portfolio-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="portfolio-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 7}s`,
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="portfolio-container">
        <motion.div ref={ref} className="portfolio-content">
          {/* Section header */}
          <motion.div
            className="portfolio-header"
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
          >
            <div className="section-tag">Our Work</div>
            <Title level={2} className="portfolio-title">
              Showcasing <span className="highlight">Excellence</span> in
              Digital Craftsmanship
            </Title>
            <Paragraph className="portfolio-description">
              Explore our featured projects that demonstrate our expertise
              across various industries and technologies. Each project
              represents our commitment to quality, innovation, and delivering
              exceptional results.
            </Paragraph>
          </motion.div>

          {/* Project spotlight - Featured projects with special layout */}
          {!isMobile && featuredProjects.length > 0 && (
            <motion.div
              className="project-spotlight"
              variants={headerVariants}
              initial="hidden"
              animate={featuredControls}
            >
              <Row gutter={[32, 32]} className="spotlight-row">
                {featuredProjects.map((project, index) => (
                  <Col xs={24} md={12} key={project.id}>
                    <motion.div
                      className="spotlight-card"
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                      }}
                      variants={projectVariants}
                    >
                      <div className="spotlight-image-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="spotlight-image"
                        />
                        <div className="spotlight-overlay"></div>
                        <div className="spotlight-category">
                          {project.category}
                        </div>
                      </div>
                      <div className="spotlight-content">
                        <Title level={3} className="spotlight-title">
                          {project.title}
                        </Title>
                        <Paragraph className="spotlight-description">
                          {project.description}
                        </Paragraph>
                        <div className="spotlight-tech">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="spotlight-actions">
                          <Button
                            type="primary"
                            className="view-project-btn"
                            icon={<GlobalOutlined />}
                            href={project.link}
                            target="_blank"
                          >
                            View Project
                          </Button>
                          {project.github && (
                            <Button
                              className="github-btn"
                              icon={<GithubOutlined />}
                              href={project.github}
                              target="_blank"
                            >
                              View Code
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}

          {/* Project filters - Custom implementation instead of Ant Design Tabs */}
          <motion.div
            className="portfolio-filter"
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
          >
            <div className="custom-filter-tabs">
              <button
                className={`filter-button ${
                  activeCategory === "all" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("all")}
              >
                All Projects
              </button>
              <button
                className={`filter-button ${
                  activeCategory === "e-commerce" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("e-commerce")}
              >
                E-commerce
              </button>
              <button
                className={`filter-button ${
                  activeCategory === "web-app" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("web-app")}
              >
                Web Apps
              </button>
              <button
                className={`filter-button ${
                  activeCategory === "website" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("website")}
              >
                Websites
              </button>
            </div>
          </motion.div>

          {/* Projects grid - with simplified reliable animations */}
          <div className="projects-grid" key={animationKey}>
            {filteredProjects.length > 0 ? (
              <Row gutter={[24, 24]}>
                {filteredProjects.map((project, index) => (
                  <Col
                    xs={24}
                    sm={12}
                    lg={8}
                    key={project.id}
                    className="project-col"
                  >
                    <motion.div
                      className="project-card"
                      initial={{ opacity: 0.3, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      <div className="project-image-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-image"
                        />
                        <div className="project-overlay">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<SearchOutlined />}
                            className="view-details-btn"
                            href={project.link}
                            target="_blank"
                          />
                        </div>
                        <div className="project-category">
                          {project.category}
                        </div>
                      </div>
                      <div className="project-info">
                        <Title level={4} className="project-title">
                          {project.title}
                        </Title>
                        <Paragraph className="project-description">
                          {project.description}
                        </Paragraph>
                        <div className="project-tech">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-projects"
              >
                <Empty
                  description="No projects found in this category"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              </motion.div>
            )}
          </div>

          {/* CTA Section */}
          <motion.div
            className="portfolio-cta"
            variants={headerVariants}
            initial="hidden"
            animate={headerControls}
          >
            <div className="cta-content">
              <Title level={3} className="cta-title">
                Ready to Start Your Project?
              </Title>
              <Paragraph className="cta-description">
                Let's create something amazing together. Our team is ready to
                bring your vision to life.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                className="cta-button"
                icon={<ArrowRightOutlined />}
                href="#contact"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
