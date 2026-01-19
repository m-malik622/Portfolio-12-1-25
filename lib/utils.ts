import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const Status = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};


export const Technologies = {
  FLUTTER: { name: "Dart · Flutter", category: "Languages & Frameworks" },
  GO: { name: "Go", category: "Languages & Frameworks" },
  PYTHON: { name: "Python", category: "Languages & Frameworks" },
  DJANGO: { name: "Django", category: "Languages & Frameworks" },
  FASTAPI: { name: "FastAPI", category: "Languages & Frameworks" },
  JAVA: { name: "Java", category: "Languages & Frameworks" },
  JAVASCRIPT: { name: "JavaScript", category: "Languages & Frameworks" },
  TYPESCRIPT: { name: "TypeScript", category: "Languages & Frameworks" },
  REACT: { name: "React · Next.js", category: "Languages & Frameworks" },
  NODE_JS: { name: "Node.js", category: "Languages & Frameworks" },
  HTML: { name: "HTML", category: "Languages & Frameworks" },
  CSS: { name: "CSS", category: "Languages & Frameworks" },
  C: { name: "C", category: "Languages & Frameworks" },
  CPP: { name: "C++", category: "Languages & Frameworks" },

  AWS: { name: "AWS", category: "Cloud & DevOps" },
  DYNAMODB: { name: "DynamoDB", category: "Cloud & DevOps" },
  LAMBDA: { name: "Lambda", category: "Cloud & DevOps" },
  VERCEL: { name: "Vercel", category: "Cloud & DevOps" },
  DOCKER: { name: "Docker", category: "Cloud & DevOps" },
  GCP: { name: "Google Cloud Platform", category: "Cloud & DevOps" },

  POSTGRESQL: { name: "PostgreSQL", category: "Databases" },
  SUPABASE: { name: "Supabase", category: "Databases" },
  FIREBASE: { name: "Firebase", category: "Databases" },

  // AI/ML
  PYTORCH: { name: "PyTorch", category: "AI/ML" },
  LANGCHAIN: { name: "LangChain", category: "AI/ML" },
  FASTMCP: { name: "FastMCP", category: "AI/ML" },

  // Web Scraping 
  BEAUTIFUL_SOUP: { name: "BeautifulSoup", category: "Web Scraping" },
  MOVIEPY: { name: "MoviePy", category: "Web Scraping" },

  //Testing and Automation
  SELENIUM: { name: "Selenium", category: "Testing & Automation" },
  GITHUB_ACTIONS: {
    name: "GitHub Actions",
    category: "Testing & Automation",
  },
  UNIT_TESTING: { name: "Unit Testing", category: "Testing & Automation" },
  PROPERTY_TESTING: { name: "Property Testing · Jqwik", category: "Testing & Automation" },
};