// src/data/statisticsData.js
export const statistics = [
  { value: "500+", label: "Projects Completed" },
  { value: "150+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

// src/data/contactData.js
import {
  MailOutlined,
  PhoneOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const contactInfo = [
  {
    icon: <MailOutlined className="contact-icon" />,
    title: "Email",
    description: (
      <a href="mailto:info@webdevservices.com">info@webdevservices.com</a>
    ),
  },
  {
    icon: <PhoneOutlined className="contact-icon" />,
    title: "Phone",
    description: <a href="tel:+1234567890">(123) 456-7890</a>,
  },
  {
    icon: <ApartmentOutlined className="contact-icon" />,
    title: "Address",
    description: "123 Web Dev Street, Digital City, WD 12345",
  },
  {
    icon: <ClockCircleOutlined className="contact-icon" />,
    title: "Business Hours",
    description: "Monday - Friday: 9AM - 5PM",
  },
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

// src/data/navLinks.js
export const navLinks = [
  { key: "1", to: "home", name: "Home" },
  { key: "2", to: "services", name: "Services" },
  { key: "3", to: "about", name: "About" },
  { key: "4", to: "testimonials", name: "Testimonials" },
  { key: "5", to: "contact", name: "Contact" },
];
