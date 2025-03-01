// src/App.js
import React, { useEffect, useState } from "react";
import { Layout, BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

// Import components
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Statistics from "./components/Statistics/Statistics";
import Services from "./components/Services/Services";
import About from "./components/About/About";
<<<<<<< Updated upstream
<<<<<<< Updated upstream

=======
// Import the new FlatEarth component
>>>>>>> Stashed changes
=======
// Import the new FlatEarth component
>>>>>>> Stashed changes
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import InnovativeApproach from "./components/InnovativeApproach/InnovativeApproach"; // Import the new component
const { Content } = Layout;

const App = () => {
  // State to track if we're on a mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Initialize AOS animation library and handle mobile-specific setup
  useEffect(() => {
    // Configure AOS with more mobile-friendly settings
    AOS.init({
      duration: isMobile ? 600 : 800, // Shorter duration on mobile
      once: false,
      mirror: false, // No mirroring for cleaner animations
      offset: isMobile ? 50 : 100, // Smaller offset on mobile
      easing: "ease-out", // Smoother animation
      disable: "phone", // Disable on mobile for better performance if needed
    });
    AOS.refresh();

    // Fix for 100vh issue on mobile browsers (especially iOS)
    const setVh = () => {
      // This sets a CSS variable that represents 1% of the viewport height
      // This fixes the 100vh issue on mobile browsers where the address bar takes up space
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Call it initially
    setVh();

    // Handle resize for responsive design
    const handleResize = () => {
      setVh();
      setIsMobile(window.innerWidth <= 768);

      // Refresh AOS on resize to ensure animations work correctly
      AOS.refresh();
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <Layout className="layout">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Header />

      <Content id="main-content">
        <Hero />
        <Statistics />
        <Services />
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <InnovativeApproach />
=======
=======
>>>>>>> Stashed changes

        {/* Add the FlatEarth component here, between Services and About */}
>>>>>>> Stashed changes
        <About />
        <Testimonials />
        <Contact />
      </Content>

      <Footer />

      <BackTop>
        <motion.div
          className="back-to-top"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          style={{
            height: isMobile ? "44px" : "40px", // Larger touch target on mobile
            width: isMobile ? "44px" : "40px", // Larger touch target on mobile
            lineHeight: isMobile ? "44px" : "40px",
            borderRadius: "50%",
            backgroundColor: "#1890ff",
            color: "#fff",
            textAlign: "center",
            fontSize: "18px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            // Ensure it doesn't overlap with iOS bottom bar
            bottom: "env(safe-area-inset-bottom, 0px)",
          }}
          aria-label="Back to top"
          role="button"
          tabIndex={0}
        >
          <UpOutlined />
        </motion.div>
      </BackTop>
    </Layout>
  );
};

export default App;
