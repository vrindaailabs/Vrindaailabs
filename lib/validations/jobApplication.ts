import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const jobApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters.")
    .max(100, "Full name cannot exceed 100 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number."
    ),

  currentCompany: z
    .string()
    .trim()
    .max(100, "Current company cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  experience: z
    .string()
    .trim()
    .min(1, "Experience is required."),

  expectedCTC: z
    .string()
    .trim()
    .min(1, "Expected CTC is required."),

  noticePeriod: z
    .string()
    .trim()
    .min(1, "Please select your notice period."),

  coverLetter: z
    .string()
    .trim()
    .max(2000, "Cover letter cannot exceed 2000 characters.")
    .optional()
    .or(z.literal("")),

  resume: z
    .instanceof(File, {
      message: "Please upload your resume.",
    })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      {
        message: "Resume must be smaller than 5 MB.",
      }
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      {
        message: "Only PDF, DOC and DOCX files are allowed.",
      }
    ),
});

export type JobApplicationFormData = z.infer<
  typeof jobApplicationSchema
>;