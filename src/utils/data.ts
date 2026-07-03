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

// Parses a "Month Year" start date (e.g. "July 2023") and returns whole years
// elapsed since then, so experience stats never go stale.
export function getYearsOfExperience(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }

  return Math.max(years, 1);
}

export function getTechnologyCount(skills: ResumeData['skills']): number {
  return Object.values(skills).reduce((total, list) => total + list.length, 0);
}
