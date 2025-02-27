import React, { useEffect } from "react";
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
import FlatEarth from "./components/FlatEarth/FlatEarth"; // Import the new FlatEarth component
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const { Content } = Layout;

const App = () => {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 800, // Shorter duration for subtler animations
      once: false,
      mirror: false, // No mirroring for cleaner animations
      offset: 100, // Trigger a bit earlier
      easing: "ease-out", // Smoother animation
    });
    AOS.refresh();
  }, []);

  return (
    <Layout className="layout">
      <Header />

      <Content>
        <Hero />
        <Statistics />
        <Services />
        <FlatEarth />{" "}
        {/* Add the FlatEarth component here, between Services and About */}
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
            height: "40px",
            width: "40px",
            lineHeight: "40px",
            borderRadius: "50%",
            backgroundColor: "#1890ff",
            color: "#fff",
            textAlign: "center",
            fontSize: "18px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <UpOutlined />
        </motion.div>
      </BackTop>
    </Layout>
  );
};

export default App;
