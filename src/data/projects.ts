export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'app' | 'games' | 'ai';
  scope: 'external' | 'internal';
  images: string[];
  tags: string[];
  featured?: boolean;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Freebie",
    description: "Official website of Institut Teknologi Bandung’s Learning Management System, built to deliver modern, flexible, and interactive education. It provides a seamless platform for managing courses, facilitating online learning, and fostering collaboration between students and lecturers",
    category: "web",
    scope: "internal",
    images: ["/portfolio/image.png", "/portfolio/image.png", "/portfolio/image.png", "/portfolio/image.png", "/portfolio/image.png", "/portfolio/image.png"],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "2",
    title: "E-Commerce Platform",
    description: "A comprehensive e-commerce solution with advanced inventory management, payment processing, and analytics dashboard. Built with modern web technologies to provide seamless shopping experiences.",
    category: "web",
    scope: "external",
    images: ["/project2-1.jpg", "/project2-2.jpg"],
    tags: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools. Designed with user experience and security as top priorities.",
    category: "app",
    scope: "external",
    images: ["/project3-1.jpg", "/project3-2.jpg", "/project3-3.jpg"],
    tags: ["React Native", "Firebase", "Biometric Auth", "Encryption"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "4",
    title: "AI-Powered Chatbot",
    description: "Intelligent customer service chatbot powered by machine learning algorithms. Capable of understanding natural language, providing contextual responses, and learning from interactions.",
    category: "ai",
    scope: "external",
    images: ["/project4-1.jpg", "/project4-2.jpg"],
    tags: ["Python", "TensorFlow", "NLP", "OpenAI API"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "5",
    title: "Multiplayer Game",
    description: "Real-time multiplayer strategy game with advanced graphics and smooth gameplay. Features include matchmaking, leaderboards, and cross-platform compatibility.",
    category: "games",
    scope: "internal",
    images: ["/project5-1.jpg", "/project5-2.jpg"],
    tags: ["Unity", "C#", "WebSocket", "AWS"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "6",
    title: "Data Analytics Dashboard",
    description: "Comprehensive business intelligence dashboard with real-time data visualization, custom reports, and predictive analytics. Helps organizations make data-driven decisions.",
    category: "web",
    scope: "external",
    images: ["/project6-1.jpg", "/project6-2.jpg"],
    tags: ["D3.js", "Python", "PostgreSQL", "Redis"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "7",
    title: "IoT Smart Home System",
    description: "Integrated smart home automation system with mobile app control, voice commands, and energy monitoring. Connects various IoT devices for seamless home management.",
    category: "app",
    scope: "external",
    images: ["/project7-1.jpg", "/project7-2.jpg"],
    tags: ["Flutter", "Arduino", "MQTT", "Raspberry Pi"],
    image: "/portfolio/image.png",
    featured: true
  },
  {
    id: "8",
    title: "Blockchain Voting System",
    description: "Secure and transparent voting platform built on blockchain technology. Ensures vote integrity, prevents fraud, and provides real-time results with complete audit trails.",
    category: "web",
    scope: "internal",
    images: ["/project8-1.jpg", "/project8-2.jpg"],
    tags: ["Solidity", "Web3.js", "Ethereum", "IPFS"],
    image: "/portfolio/image.png",
    featured: true
  }
];

export const featuredProjects = projects.filter(project => project.featured);

