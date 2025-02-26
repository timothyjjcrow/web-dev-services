import shopifyLogo from "../shopifyLogo.jpg";
import vueLogo from "../vueLogo.png";
import reactLogo from "../reactLogo.png";
import angularLogo from "../angular-3-logo-svg-vector.svg";
// Using placeholder images for these
import wordpressLogo from "../shopifyLogo.jpg";
import nodeLogo from "../reactLogo.png";

export const services = [
  {
    title: "Custom Web Development",
    description:
      "Tailored websites that perfectly match your business requirements and goals.",
    details:
      "Our team crafts custom web solutions using cutting-edge technologies that ensure optimal performance, scalability, and user experience. We follow industry best practices for clean code, responsive design, and accessibility standards.",
    features: [
      "Responsive design that looks great on all devices",
      "Performance optimization for fast loading times",
      "SEO-friendly architecture and implementation",
      "Custom functionality tailored to your business needs",
      "Thorough testing and quality assurance",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Angular", svg: angularLogo, link: "https://angular.io/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
      { name: "Node.js", svg: nodeLogo, link: "https://nodejs.org/" },
    ],
  },
  {
    title: "E-commerce Solutions",
    description:
      "Powerful online stores that drive sales and provide excellent customer experiences.",
    details:
      "We build e-commerce platforms that combine attractive design with powerful functionality. Our solutions include secure payment processing, inventory management, customer accounts, and analytics integration to help you grow your online business.",
    features: [
      "User-friendly product catalog and shopping cart",
      "Secure payment gateway integration",
      "Inventory and order management",
      "Customer account management",
      "Mobile-optimized shopping experience",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "Shopify", svg: shopifyLogo, link: "https://www.shopify.com/" },
      { name: "WordPress", svg: wordpressLogo, link: "https://wordpress.org/" },
    ],
  },
  {
    title: "Website Maintenance",
    description:
      "Comprehensive care to keep your site secure, updated, and performing at its best.",
    details:
      "Our maintenance packages ensure your website remains secure, up-to-date, and running smoothly. We handle regular updates, security monitoring, performance optimization, content updates, and technical support to give you peace of mind.",
    features: [
      "Regular software and security updates",
      "Performance monitoring and optimization",
      "Content updates and management",
      "Backup and recovery solutions",
      "Technical support and troubleshooting",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    logos: [
      { name: "WordPress", svg: wordpressLogo, link: "https://wordpress.org/" },
      { name: "React", svg: reactLogo, link: "https://reactjs.org/" },
      { name: "Vue", svg: vueLogo, link: "https://vuejs.org/" },
    ],
  },
];
