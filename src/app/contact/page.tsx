"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProjectInquiryForm, {
  FormData,
} from "./components/project-inquiry-form";
import LoadingOverlay from "@/components/loading-overlay";
import {
  submitContactForm,
  validateFormData,
} from "@/lib/contact-form-service";
import type { ContactFormValidation } from "@/types/contact";

const ProjectInquiryPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    whatsappNumber: "",
    email: "",
    company: "",
    isAcademic: false,
    hearAbout: [],
    othersSpecify: "",
    projectType: "",
    projectPurpose: "",
    costExpectations: "",
    projectDeadline: "",
    hasDesign: false,
    projectDetails: "",
    questions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] =
    useState<ContactFormValidation>({});

  const handleSubmit = async () => {
    setValidationErrors({});

    const errors = validateFormData({
      ...formData,
      company: formData.company || "",
      othersSpecify: formData.othersSpecify || "",
      questions: formData.questions || "",
    });
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error("Please fix validation errors", {
        description: "Some required fields are missing or invalid",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm({
        ...formData,
        company: formData.company || "",
        othersSpecify: formData.othersSpecify || "",
        questions: formData.questions || "",
        projectTypeOther: formData.projectTypeOther || "",
      });

      toast.success("Thank you for your inquiry!", {
        description: "We'll get back to you within 24 hours. Redirecting...",
        duration: 2000,
      });

      setFormData({
        fullName: "",
        whatsappNumber: "",
        email: "",
        company: "",
        isAcademic: false,
        hearAbout: [],
        othersSpecify: "",
        projectType: "",
        projectPurpose: "",
        costExpectations: "",
        projectDeadline: "",
        hasDesign: false,
        projectDetails: "",
        questions: "",
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form", {
        description:
          error instanceof Error
            ? error.message
            : "Please try again or contact support",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <LoadingOverlay isLoading={isSubmitting} />
      <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-[#7E67C1] to-blue-300 bg-clip-text text-transparent pb-4 sm:pb-8">
              Let's Build Something
              <br />
              Amazing Together
            </h1>
            <p className="text-gray-100 text-base sm:text-lg font-light max-w-4xl mx-auto">
              Have an idea or a project in mind? We'd love to hear from you.
            </p>

            <div className="mb-8 mt-8 sm:mt-12 lg:mt-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-5">
                Project Inquiry
              </h2>
              <p className="text-gray-300 text-sm sm:text-md lg:text-2xl">
                Tell us about your project and we'll get back to you within 24
                hours.
              </p>
            </div>
          </div>
          <div className="bg-[#201C1D] rounded-xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm">
            <ProjectInquiryForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              validationErrors={validationErrors}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInquiryPage;
