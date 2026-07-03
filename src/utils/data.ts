import resumeData from '@/data/resume.json';

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

export function getResumeData(): ResumeData {
  return resumeData as ResumeData;
}
