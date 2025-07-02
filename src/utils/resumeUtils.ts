
// Main export file that re-exports all resume-related utilities
// This maintains backward compatibility with existing imports

import { templates, defaultResumeData } from './resumeDefaults';
import { generateUniqueId, groupSkillsByCategory, determineSkillCategory } from './resumeHelpers';
import { exportToPDF } from './pdfExport';
import { importResumeFromFile } from './resumeImport';

// Re-export types with proper export type syntax for isolatedModules compatibility
export type { 
  ResumeData,
  ResumeTemplate,
  ContactInfo,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  SkillsByCategory,
  SkillItem 
} from './resumeTypes';
  
// Re-export everything else to maintain backward compatibility
export {
  // Default data
  templates, defaultResumeData,
  
  // Helper functions
  generateUniqueId, groupSkillsByCategory, determineSkillCategory,
  
  // PDF operations
  exportToPDF, importResumeFromFile
};
