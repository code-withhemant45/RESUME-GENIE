
import { ResumeData, ResumeTemplate } from './resumeTypes';

export const templates: ResumeTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "A traditional resume layout with a clean, professional appearance"
  },
  {
    id: "modern",
    name: "Modern",
    description: "A contemporary design with a sleek, minimalist style"
  },
  {
    id: "creative",
    name: "Creative",
    description: "A bold, colorful design that showcases your personality"
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "A simple, clean design focusing on content"
  }
];

export const defaultResumeData: ResumeData = {
  contactInfo: {
    fullName: "Hemant Soni",
    title: "Software Engineer",
    email: "hemant@example.com",
    phone: "(123) 456-7890",
    location: "Bhopal, Madhya Pradesh",
    linkedin: "linkedin.com/in/hemantsoni",
    website: "hemantsoni.com",
    portfolio: "portfolio.hemantsoni.com",
    github: "github.com/hemantsoni",
    leetcode: "leetcode.com/hemantsoni",
    codechef: "codechef.com/users/hemantsoni"
  },
  aboutContent: "Experienced software engineer with a passion for creating efficient and scalable applications. Skilled in React, TypeScript, and Node.js with a strong understanding of software development principles.",
  experienceItems: [
    {
      id: "exp1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "Bhopal, MP",
      description: "Developed and maintained web applications using React and TypeScript. Led a team of 5 developers."
    },
    {
      id: "exp2",
      company: "Digital Innovations Ltd",
      position: "Software Developer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      location: "Indore, MP",
      description: "Built RESTful APIs using Node.js and Express. Implemented CI/CD pipelines for automated testing and deployment."
    }
  ],
  educationItems: [
    {
      id: "edu1",
      institution: "University of Technology",
      degree: "Bachelor's",
      field: "Computer Science",
      startDate: "2013",
      endDate: "2017",
      location: "Boston, MA"
    }
  ],
  projectItems: [
    {
      id: "proj1",
      title: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with React, Node.js, and MongoDB",
      startDate: "Jan 2021",
      endDate: "Jun 2021",
      link: "github.com/johndoe/ecommerce",
      technologies: "React, Node.js, Express, MongoDB"
    },
    {
      id: "proj2",
      title: "Portfolio Website",
      description: "Designed and developed a personal portfolio website",
      startDate: "Aug 2020",
      endDate: "Sep 2020",
      link: "johndoe.com",
      technologies: "React, Tailwind CSS, Framer Motion"
    }
  ],
  certificationItems: [
    {
      id: "cert1",
      name: "AWS Certified Developer",
      organization: "Amazon Web Services",
      issueDate: "May 2022",
      expiryDate: "May 2025",
      credentialId: "AWS-12345",
      link: "aws.amazon.com/verification"
    },
    {
      id: "cert2",
      name: "React Advanced Patterns",
      organization: "Frontend Masters",
      issueDate: "Jan 2021",
      link: "frontendmasters.com/certificates/12345"
    }
  ],
  skillItems: [
    { id: "skill1", name: "JavaScript", category: "languages" },
    { id: "skill2", name: "TypeScript", category: "languages" },
    { id: "skill3", name: "Python", category: "languages" },
    { id: "skill4", name: "React", category: "frontend" },
    { id: "skill5", name: "HTML/CSS", category: "frontend" },
    { id: "skill6", name: "Node.js", category: "backend" },
    { id: "skill7", name: "Express", category: "frameworks" },
    { id: "skill8", name: "MongoDB", category: "database" },
    { id: "skill9", name: "PostgreSQL", category: "database" },
    { id: "skill10", name: "Docker", category: "tools" },
    { id: "skill11", name: "Git", category: "versionControl" }
  ],
  selectedTemplate: "classic"
};
