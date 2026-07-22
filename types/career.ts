export interface CareerPosition {
  id: number;
  title: string;
  department: string;
  employmentType: "Full Time" | "Part Time" | "Internship" | "Contract";
  location: string;
  experience: string;
  description: string;
  skills: string[];
  isActive: boolean;
}