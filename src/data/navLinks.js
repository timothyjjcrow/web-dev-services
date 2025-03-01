// src/data/navLinks.js
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
export const navLinks = [
  { key: "1", to: "home", name: "Home" },
  { key: "2", to: "services", name: "Services" },
  { key: "3", to: "portfolio", name: "Portfolio" }, // Add the new Portfolio nav link
  { key: "4", to: "about", name: "About" },
  { key: "5", to: "testimonials", name: "Testimonials" },
  { key: "6", to: "contact", name: "Contact" },
];

export const socialLinks = [
  {
    icon: <GithubOutlined />,
    link: "https://github.com",
  },
  {
    icon: <LinkedinOutlined />,
    link: "https://linkedin.com",
  },
  {
    icon: <TwitterOutlined />,
    link: "https://twitter.com",
  },
];
