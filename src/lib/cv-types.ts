export type CVData = {
  basics: {
    fullName: string;
    role: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedIn?: string;
    photoUrl?: string;
    summary?: string;
  };
  experience: Array<{
    company: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    bullets: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    location?: string;
    startDate: string;
    endDate: string;
    notes?: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
    url?: string;
  }>;
  languages?: Array<{
    name: string;
    level: string;
  }>;
  awards?: Array<{
    title: string;
    issuer?: string;
    year: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer?: string;
    year?: string;
  }>;
  interests?: string[];
};
