import { z } from "zod";

export const projectInquirySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  whatsappNumber: z
    .string()
    .min(10, "Whatsapp number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Whatsapp number must contain only digits"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  isAcademic: z.boolean(),
  hearAbout: z.array(z.string()).min(1, "Please select at least one option"),
  othersSpecify: z.string().optional(),
  projectType: z.string().min(1, "Project type is required"),
  projectPurpose: z.string().min(1, "Project purpose is required"),
  costExpectations: z.string().min(1, "Cost expectations are required"),
  projectDeadline: z.string().min(1, "Project deadline is required"),
  hasDesign: z.boolean(),
  projectDetails: z.string().min(1, "Project details are required"),
  questions: z.string().optional(),
  projectTypeOther: z.string().optional(),
});
