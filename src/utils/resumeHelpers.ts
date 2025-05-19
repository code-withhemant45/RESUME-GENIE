
import { SkillItem, SkillsByCategory } from './resumeTypes';

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const groupSkillsByCategory = (skills: SkillItem[]): SkillsByCategory => {
  return skills.reduce((categories, skill) => {
    const category = skill.category;
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(skill);
    return categories;
  }, {} as SkillsByCategory);
};

// Helper to determine skill category based on common knowledge
export const determineSkillCategory = (skill: string): 'languages' | 'frontend' | 'backend' | 'frameworks' | 'database' | 'tools' | 'versionControl' => {
  const skillCategories: { [key: string]: 'languages' | 'frontend' | 'backend' | 'frameworks' | 'database' | 'tools' | 'versionControl' } = {
    'javascript': 'languages',
    'typescript': 'languages',
    'python': 'languages',
    'java': 'languages',
    'c++': 'languages',
    'c#': 'languages',
    'html': 'frontend',
    'css': 'frontend',
    'sass': 'frontend',
    'less': 'frontend',
    'react': 'frontend',
    'angular': 'frontend',
    'vue': 'frontend',
    'redux': 'frontend',
    'node': 'backend',
    'express': 'backend',
    'django': 'frameworks',
    'flask': 'frameworks',
    'spring': 'frameworks',
    'mongodb': 'database',
    'mysql': 'database',
    'postgresql': 'database',
    'sql': 'database',
    'nosql': 'database',
    'aws': 'tools',
    'docker': 'tools',
    'kubernetes': 'tools',
    'git': 'versionControl',
    'github': 'versionControl',
    'gitlab': 'versionControl',
  };

  return skillCategories[skill.toLowerCase()] || 'tools';
};
