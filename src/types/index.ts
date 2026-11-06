export interface ProfileData {
  brand: string;
  name: string;
  title: string;
  tagline: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  aboutIntro: string;
  philosophy: string[];
  contact: {
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  metrics: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  quickInfo: {
    label: string;
    value: string;
  }[];
}

export type TechCategoryType = 'frontend' | 'backend' | 'database' | 'workflow' | 'realtime' | 'programming' | 'core_cs';

export interface TechItem {
  name: string;
  category: TechCategoryType;
  description: string;
  iconName: string;
  highlight?: boolean;
  projectsUsed: string[]; // Project IDs
}

export interface TechCategory {
  id: TechCategoryType;
  title: string;
  badge: string;
  description: string;
  skills: TechItem[];
}

export interface ArchitectureLayer {
  title: string;
  role: string;
  tech: string[];
  details: string[];
}

export interface DatabaseSchemaModel {
  name: string;
  purpose: string;
  fields: { name: string; type: string; desc: string }[];
}

export interface ChallengeItem {
  problem: string;
  solution: string;
  outcome: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  categoryType: 'mern' | 'realtime' | 'ecommerce';
  featured: boolean;
  shortDescription: string;
  fullOverview: string;
  problemStatement: string;
  solutionStrategy: string;
  technologies: string[];
  primaryTech: {
    mongo: string;
    express: string;
    react: string;
    node: string;
  };
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  workflows: {
    title: string;
    audience: string;
    steps: string[];
  }[];
  architectureDiagram: ArchitectureLayer[];
  databaseDesign: DatabaseSchemaModel[];
  challenges: ChallengeItem[];
  githubUrl: string;
  liveDemoUrl?: string;
  status: 'Production-Ready' | 'Completed' | 'Active';
  previewMockup: {
    gradient: string;
    accentColor: string;
    badge: string;
  };
}

export interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  periodBadge: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
  scoreType: string;
  focus: string[];
}
