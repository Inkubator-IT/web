"use client";

import React, { useState } from "react";
import ProjectInquiryForm, {
  FormData,
} from "./components/project-inquiry-form";

const ProjectInquiryPage: React.FC = () => {
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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-[#7E67C1] to-blue-300 bg-clip-text text-transparent pb-4 sm:pb-8">
            Let's Build Something
            <br />
            Amazing Together
          </h1>
          <p className="text-gray-100 text-lg sm:text-xl lg:text-4xl max-w-4xl mx-auto">
            Have an idea or a project in mind? We'd love to hear from you.
          </p>

          <div className="mb-8 mt-8 sm:mt-20 lg:mt-28">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl mb-3 sm:mb-5">
              Project Inquiry
            </h2>
            <p className="text-gray-300 text-base sm:text-lg lg:text-3xl">
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
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInquiryPage;
