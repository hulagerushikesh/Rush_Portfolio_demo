export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image_url: string | null;
  technologies: string[];
  status: 'active' | 'coming-soon' | 'archived';
  featured: boolean;
  github_url: string | null;
  live_url: string | null;
  project_date: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}
