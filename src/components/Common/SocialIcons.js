// src/components/common/SocialIcons.js
import React from "react";
import { motion } from "framer-motion";

const SocialIcons = ({ icons, size = "medium", color = "default" }) => {
  // Size presets
  const sizes = {
    small: { width: "36px", height: "36px", fontSize: "16px" },
    medium: { width: "44px", height: "44px", fontSize: "18px" },
    large: { width: "50px", height: "50px", fontSize: "20px" },
  };

  // Color presets
  const colors = {
    default: { bg: "#f5f5f5", color: "#1f1f1f" },
    primary: { bg: "#1890ff", color: "#ffffff" },
    dark: { bg: "rgba(255, 255, 255, 0.1)", color: "#ffffff" },
  };

  const selectedSize = sizes[size] || sizes.medium;
  const selectedColor = colors[color] || colors.default;

  return (
    <div className="social-icons" style={{ display: "flex", gap: "15px" }}>
      {icons.map((social, index) => (
        <motion.a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: selectedSize.width,
            height: selectedSize.height,
            borderRadius: "50%",
            backgroundColor: selectedColor.bg,
            color: selectedColor.color,
            fontSize: selectedSize.fontSize,
            transition: "all 0.3s ease",
          }}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialIcons;
