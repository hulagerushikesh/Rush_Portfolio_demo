import projectsData from '@/data/projects.json';
import resumeData from '@/data/resume.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  status: 'active' | 'coming-soon' | 'archived';
  featured: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
  date: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
  }>;
  skills: {
    languages: string[];
    aiMl: string[];
    frameworks: string[];
    cloud: string[];
  };
  achievements: Array<{
    title: string;
    description: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
  }>;
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter(project => project.featured) as Project[];
}

export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id) as Project;
}

export function getResumeData(): ResumeData {
  return resumeData as ResumeData;
}
