export interface Job {
  id: number;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  qualifications: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    slug: "software-engineer",

    title: "Software Engineer",

    department: "Engineering",

    location: "Bangalore, India",

    employmentType: "Full-Time",

    experience: "2–4 Years",

    description:
      "Join Vrinda AI Labs and build AI-powered software solutions, automation platforms, and scalable enterprise applications.",

    skills: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "PostgreSQL",
      "REST APIs",
      "Docker",
      "Git",
    ],

    responsibilities: [
      "Develop scalable enterprise applications.",
      "Design and implement REST APIs.",
      "Write clean, maintainable code.",
      "Participate in code reviews.",
      "Collaborate with cross-functional teams.",
    ],

    qualifications: [
      "Bachelor's degree in Computer Science or related field.",
      "Strong Java and Spring Boot knowledge.",
      "Experience with React.",
      "Good problem-solving skills.",
    ],
  },

  {
    id: 2,

    slug: "java-developer",

    title: "Java Developer",

    department: "Engineering",

    location: "Hyderabad, India",

    employmentType: "Full-Time",

    experience: "3–5 Years",

    description:
      "Design, develop, and maintain high-performance Java backend services.",

    skills: [
      "Java",
      "Spring Boot",
      "Microservices",
      "PostgreSQL",
      "Docker",
      "Git",
    ],

    responsibilities: [
      "Develop backend services.",
      "Optimize APIs.",
      "Work with databases.",
      "Participate in Agile development.",
    ],

    qualifications: [
      "Bachelor's degree.",
      "3+ years Java experience.",
      "Spring Boot knowledge.",
    ],
  },
];