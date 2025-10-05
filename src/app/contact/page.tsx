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
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-10/12 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-[#7E67C1] to-blue-300 bg-clip-text text-transparent pb-8">
            Let's Build Something
            <br />
            Amazing Together
          </h1>
          <p className="text-gray-100 text-4xl">
            Have an idea or a project in mind? We'd love to hear from you.
          </p>

          <div className="mb-8 mt-28">
            <h2 className="text-7xl mb-5">Project Inquiry</h2>
            <p className="text-gray-300 text-3xl">
              Tell us about your project and we'll get back to you within 24
              hours.
            </p>
          </div>
        </div>

        <div className="bg-[#201C1D] rounded-xl p-8 backdrop-blur-sm">
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
