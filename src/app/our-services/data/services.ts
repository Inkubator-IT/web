import type { categoryOptions } from "@/app/portfolio/portfolio-page-client";

/**
 * Single source of truth for the services content. Both the classic card grid
 * and the 3D desk experience read from here, so copy only ever lives in one place.
 */
export interface Service {
  /** Stable slug — also the key used by the 3D scene to match an object. */
  id: string;
  title: string;
  description: string;
  features: string[];
  category: (typeof categoryOptions)[number];
  icon: { src: string; alt: string; className: string };
  image: { src: string; alt: string; className: string };
}

export const services: Service[] = [
  {
    id: "design-prototype",
    title: "Design Prototype",
    description:
      "Transform ideas into interactive prototypes that bring clarity, speed, and precision to your product development.",
    features: [
      "UI/UX Design",
      "Interactive Prototypes",
      "User Research",
      "App and Website",
    ],
    category: "all",
    icon: {
      src: "/our-services/icon/1.svg",
      alt: "Design prototype icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/1.png",
      alt: "",
      className: "h-24 w-24",
    },
  },
  {
    id: "website-development",
    title: "Website Development",
    description:
      "Build modern, responsive, and scalable websites tailored to your business needs.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "CMS Integration",
      "E-commerce, Company Profile, etc",
    ],
    category: "web",
    icon: {
      src: "/our-services/icon/2.svg",
      alt: "Website development icon",
      className: "h-6 w-6 rounded-xl",
    },
    image: {
      src: "/our-services/image/2.png",
      alt: "",
      className: "h-24 w-32 rounded-xl",
    },
  },
  {
    id: "mobile-applications",
    title: "Mobile Applications",
    description:
      "Deliver seamless mobile experiences with apps designed for performance and user engagement.",
    features: [
      "iOS & Android Apps",
      "Cross-Platform Development",
      "Performance Optimization",
      "Push Notifications",
    ],
    category: "app",
    icon: {
      src: "/our-services/icon/3.svg",
      alt: "Mobile applications icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/3.png",
      alt: "",
      className: "h-24 w-32 rounded-xl",
    },
  },
  {
    id: "desktop-applications",
    title: "Desktop Applications",
    description:
      "Create powerful, efficient, and secure desktop applications to support complex workflows.",
    features: [
      "Windows, macOS, Linux",
      "Custom Business Solutions",
      "High-Performance Systems",
      "Secure Data Handling",
    ],
    category: "app",
    icon: {
      src: "/our-services/icon/4.svg",
      alt: "Desktop applications icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/4.png",
      alt: "",
      className: "h-24 w-32 rounded-xl",
    },
  },
  {
    id: "ai-ml",
    title: "AI/ML Solutions",
    description:
      "Unlock smarter decision-making with AI and machine learning solutions customized for your goals.",
    features: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Systems",
    ],
    category: "ai",
    icon: {
      src: "/our-services/icon/5.svg",
      alt: "AI and machine learning icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/5.png",
      alt: "",
      className: "h-24 w-32",
    },
  },
  {
    id: "ar-vr",
    title: "AR/VR Solutions",
    description:
      "Enhance engagement through immersive AR/VR experiences that blend innovation with interactivity.",
    features: [
      "Augmented Reality Apps",
      "Virtual Reality Experiences",
      "3D Visualization",
      "Interactive Training",
    ],
    category: "all",
    icon: {
      src: "/our-services/icon/6.svg",
      alt: "AR and VR icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/6.png",
      alt: "",
      className: "h-24 w-32",
    },
  },
  {
    id: "iot",
    title: "IoT Solutions",
    description:
      "Connect devices and systems with IoT solutions that improve efficiency and unlock new opportunities.",
    features: [
      "Smart Device Integration",
      "Real-Time Monitoring",
      "Data Analytics",
      "Automation Systems",
    ],
    category: "all",
    icon: {
      src: "/our-services/icon/7.svg",
      alt: "IoT icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/7.png",
      alt: "",
      className: "h-24 w-32 rounded-xl",
    },
  },
  {
    id: "games-development",
    title: "Games Development",
    description:
      "Design and develop engaging, interactive games that captivate users and inspire creativity.",
    features: [
      "Game Design & Development",
      "Basic Mobile Games",
      "One or Many Main Features",
    ],
    category: "games",
    icon: {
      src: "/our-services/icon/8.svg",
      alt: "Games development icon",
      className: "h-6 w-6",
    },
    image: {
      src: "/our-services/image/8.png",
      alt: "",
      className: "h-24 w-24 rounded-xl",
    },
  },
];
