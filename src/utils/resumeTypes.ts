
export interface ContactInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  portfolio?: string;
  github?: string;
  leetcode?: string;
  codechef?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  link?: string;
  technologies: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  link?: string;
}

export interface SkillsByCategory {
  languages: SkillItem[];
  frontend: SkillItem[];
  backend: SkillItem[];
  frameworks: SkillItem[];
  database: SkillItem[];
  tools: SkillItem[];
  versionControl: SkillItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'frameworks' | 'database' | 'tools' | 'versionControl';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
}

export interface ResumeData {
  contactInfo: ContactInfo;
  aboutContent: string;
  experienceItems: ExperienceItem[];
  educationItems: EducationItem[];
  skillItems: SkillItem[];
  projectItems: ProjectItem[];
  certificationItems: CertificationItem[];
  selectedTemplate: string;
}
