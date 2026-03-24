export type UserRole = 'viewer' | 'manager';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string; // hashed in real app — plain for demo
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

export interface BasicInfo {
  name: string;
  tagline: string;
  subtitle: string;
  available: boolean;
  email: string;
  phone: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  roleHighlight: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  icon: string;
  title: string;
  tags: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export interface AboutData {
  bio: string[];
  location: string;
  education: Education[];
}

export interface ContactLink {
  id: string;
  icon: string;
  label: string;
  href: string;
}

export interface PortfolioContent {
  info: BasicInfo;
  stats: Stat[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
  about: AboutData;
  contactLinks: ContactLink[];
}
