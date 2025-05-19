
import { ResumeData } from './resumeTypes';
import { determineSkillCategory } from './resumeHelpers';

// Function to parse PDF content into resume data structure
export const parsePDFContent = (text: string): ResumeData => {
  // Initialize with default template
  const resumeData: ResumeData = {
    contactInfo: {
      fullName: "Unknown Name",
      title: "Professional",
      email: "",
      phone: "",
      location: "",
    },
    aboutContent: "",
    experienceItems: [],
    educationItems: [],
    skillItems: [],
    projectItems: [],
    certificationItems: [],
    selectedTemplate: "classic"
  };
  
  // Very basic parsing logic - can be improved
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  // Try to extract name (assuming it's at the beginning)
  if (lines.length > 0) {
    resumeData.contactInfo.fullName = lines[0].trim();
  }
  
  // Try to find email
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) {
    resumeData.contactInfo.email = emailMatch[0];
  }
  
  // Try to find phone
  const phoneRegex = /(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) {
    resumeData.contactInfo.phone = phoneMatch[0];
  }
  
  // Extract some content for the about section
  // Take a reasonable chunk from the beginning of the document
  let aboutContent = "";
  let startLine = 1; // Skip the first line which we assume is the name
  
  // Get about 100-200 characters for the about section
  while (aboutContent.length < 150 && startLine < Math.min(lines.length, 10)) {
    aboutContent += lines[startLine] + " ";
    startLine++;
  }
  
  resumeData.aboutContent = aboutContent.trim();
  
  // Extract potential skills (look for common skill keywords)
  const skillKeywords = [
    "javascript", "typescript", "python", "java", "react", "angular", "vue", 
    "node", "express", "mongodb", "sql", "nosql", "aws", "docker", "kubernetes",
    "html", "css", "sass", "less", "redux", "git", "github", "gitlab"
  ];
  
  const foundSkills = skillKeywords.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
  
  resumeData.skillItems = foundSkills.map((skill, index) => ({
    id: `skill${index + 1}`,
    name: skill.charAt(0).toUpperCase() + skill.slice(1), // Capitalize
    category: determineSkillCategory(skill)
  }));
  
  return resumeData;
};
