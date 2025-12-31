"use client";
import React, { useState } from "react";
import { User, FileText, Send, ChevronDown } from "lucide-react";
import { projectInquirySchema } from "@/lib/validators/project-inquiry";
import { z } from "zod";
import { toast } from "sonner";

type FormData = z.infer<typeof projectInquirySchema>;

interface ProjectInquiryFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
}

const ProjectInquiryForm: React.FC<ProjectInquiryFormProps> = ({
  formData,
  setFormData,
  onSubmit,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<z.ZodError["formErrors"]["fieldErrors"]>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validate({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    const newValues =
      Array.isArray(formData[field]) && formData[field].includes(value)
        ? (formData[field] as string[]).filter((item: string) => item !== value)
        : [...(formData[field] as string[]), value];

    setFormData((prev) => ({
      ...prev,
      [field]: newValues,
    }));
    validate({ ...formData, [field]: newValues });
  };

  const validate = (data: FormData) => {
    console.log("Validating data:", data);
    const result = projectInquirySchema.safeParse(data);
    console.log("Validation result:", result);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors ?? {});
    } else {
      setErrors({});
    }
    return result.success;
  };

  const handleSubmit = async () => {
    console.log("Submitting form...");
    const isValid = validate(formData);
    console.log("Is form valid?", isValid);
    if (isValid) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onSubmit();
      setIsLoading(false);
      setIsSubmitted(true);
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
        projectTypeOther: "",
      });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      toast.error("Please fill out all required fields correctly.");
    }
  };

  return (
    <div className="p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6]">
      <div className="space-y-8 bg-[#201C1D] rounded-lg p-4 sm:p-6 lg:p-8">
        {isSubmitted && (
          <div className="bg-green-500/20 text-green-300 p-4 rounded-lg text-center">
            Form submitted successfully! We will get back to you soon.
          </div>
        )}
        {/* Client Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-6">
            <User
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              style={{
                stroke: "url(#grad-user)",
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="grad-user"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop stopColor="#7E67C1" offset="0%" />
                  <stop stopColor="#BBE4F6" offset="100%" />
                </linearGradient>
              </defs>
            </svg>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] bg-clip-text text-transparent tracking-tight">
              Client Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["Full Name", "fullName", "John Doe", "text"],
              ["Whatsapp Number", "whatsappNumber", "08123456789", "tel"],
              ["Email Address", "email", "john@example.com", "email"],
              ["Company", "company", "John Company", "text"],
            ].map(([label, key, placeholder, type]) => (
              <div key={key} className="space-y-2">
                <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
                  {label}
                </label>
                <div
                  className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                    errors[key as keyof FormData]
                      ? "border border-red-500"
                      : ""
                  }`}
                >
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      handleInputChange(key as keyof FormData, e.target.value)
                    }
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                  />
                </div>
                {errors[key as keyof FormData] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[key as keyof FormData]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-4 mt-6">
            <div className="space-y-2">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300 block">
                Are you an academic at ITB?
              </label>

              <div className="mt-2 sm:mt-3 lg:mt-4 rounded-lg p-[2px] bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] w-full sm:w-fit">
                <div className="flex overflow-hidden rounded-md bg-[#201C1D]">
                  {["No", "Yes"].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() =>
                        handleInputChange("isAcademic", val === "Yes")
                      }
                      className={`flex-1 sm:flex-none sm:w-32 md:w-36 lg:w-44 h-12 sm:h-14 lg:h-16 text-base sm:text-lg lg:text-2xl flex items-center justify-center font-medium transition-all ${
                        formData.isAcademic === (val === "Yes")
                          ? "bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
                How do you hear about Inkubator IT?
              </label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3 lg:mt-4">
                  {["Instagram", "LinkedIn", "Teman", "ITB"].map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 sm:gap-3 text-gray-300 cursor-pointer select-none"
                    >
                      <div className="inline-flex p-[1px] bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] shrink-0">
                        <input
                          type="checkbox"
                          checked={
                            Array.isArray(formData.hearAbout) &&
                            formData.hearAbout.includes(option)
                          }
                          onChange={() =>
                            handleCheckboxChange("hearAbout", option)
                          }
                          className="w-4 h-4 sm:w-5 sm:h-5 appearance-none bg-[#201C1D] transition-colors duration-200 cursor-pointer focus:outline-none 
                         checked:bg-transparent checked:border-0 
                         checked:after:content-['✓'] checked:after:text-white checked:after:text-sm sm:checked:after:text-base 
                         checked:after:flex checked:after:justify-center checked:after:items-center checked:after:h-full checked:after:w-full"
                        />
                      </div>
                      <span className="text-sm sm:text-base lg:text-xl">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>

                <label className="flex items-center gap-2 sm:gap-3 text-gray-300 cursor-pointer select-none">
                  <div className="inline-flex p-[1px] bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] shrink-0">
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(formData.hearAbout) &&
                        formData.hearAbout.includes("Others")
                      }
                      onChange={() =>
                        handleCheckboxChange("hearAbout", "Others")
                      }
                      className="w-4 h-4 sm:w-5 sm:h-5 appearance-none bg-[#201C1D] transition-colors duration-200 cursor-pointer focus:outline-none 
                     checked:bg-transparent checked:border-0 
                     checked:after:content-['✓'] checked:after:text-white checked:after:text-sm sm:checked:after:text-base 
                     checked:after:flex checked:after:justify-center checked:after:items-center checked:after:h-full checked:after:w-full"
                    />
                  </div>
                  <span className="text-sm sm:text-base lg:text-xl">
                    Others
                  </span>
                </label>
                {errors.hearAbout && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hearAbout}
                  </p>
                )}

                {Array.isArray(formData.hearAbout) &&
                  formData.hearAbout.includes("Others") && (
                    <div className="p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4">
                      <input
                        type="text"
                        placeholder="Specify here"
                        value={formData.othersSpecify}
                        onChange={(e) =>
                          handleInputChange("othersSpecify", e.target.value)
                        }
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* About the Project Section */}
        <div className="space-y-6 pt-8 border-t border-gray-800">
          <div className="flex items-center gap-2 sm:gap-3 mb-6">
            <FileText
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
              style={{
                stroke: "url(#grad-user)",
              }}
            />
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] bg-clip-text text-transparent tracking-tight">
              About the Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300 flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span>Project Type</span>
                <span
                  className="text-[#b29bf8] text-sm sm:text-base lg:text-xl hover:underline cursor-pointer"
                  onClick={() => (window.location.href = "/our-services")}
                >
                  See IIT Services
                </span>
              </label>
              <div
                className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 relative ${
                  errors.projectType ? "border border-red-500" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 pr-10 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 transition-all text-left"
                >
                  <span
                    className={
                      formData.projectType ? "text-white" : "text-gray-500"
                    }
                  >
                    {formData.projectType || "Select a category"}
                  </span>
                </button>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-[#BBE4F6] pointer-events-none" />

                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6]">
                    <div className="bg-[#201C1D] rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                      {[
                        "Design Prototype",
                        "Website Development",
                        "Mobile Application",
                        "Desktop Application",
                        "AI/ML Solutions",
                        "AR/VR Solutions",
                        "IoT Solutions",
                        "Game Development",
                        "Others",
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            handleInputChange("projectType", option);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-left text-white text-base sm:text-lg lg:text-2xl hover:bg-gradient-to-r hover:from-[#7E67C1]/20 hover:to-[#BBE4F6]/20 transition-all"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.projectType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectType}
                </p>
              )}

              {formData.projectType === "Others" && (
                <div
                  className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                    errors.projectTypeOther ? "border border-red-500" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Specify project type"
                    value={formData.projectTypeOther || ""}
                    onChange={(e) =>
                      handleInputChange("projectTypeOther", e.target.value)
                    }
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                  />
                </div>
              )}
              {errors.projectTypeOther && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectTypeOther}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
                Project Creation Purpose
              </label>
              <div
                className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                  errors.projectPurpose ? "border border-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Describe the project purpose..."
                  value={formData.projectPurpose}
                  onChange={(e) =>
                    handleInputChange("projectPurpose", e.target.value)
                  }
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                />
              </div>
              {errors.projectPurpose && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectPurpose}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
                Cost Expectations
              </label>
              <div
                className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                  errors.costExpectations ? "border border-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Cost in Rupiah, e.g. 3,000,000"
                  value={formData.costExpectations}
                  onChange={(e) =>
                    handleInputChange("costExpectations", e.target.value)
                  }
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                />
              </div>
              {errors.costExpectations && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.costExpectations}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
                Project Deadline
              </label>
              <div
                className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                  errors.projectDeadline ? "border border-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Deadline in days, e.g. 60 days"
                  value={formData.projectDeadline}
                  onChange={(e) =>
                    handleInputChange("projectDeadline", e.target.value)
                  }
                  className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all"
                />
              </div>
              {errors.projectDeadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.projectDeadline}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
              Already Have a Design?
            </label>
            <div className="mt-2 sm:mt-3 lg:mt-4 rounded-lg p-[2px] bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] w-full sm:w-fit">
              <div className="flex overflow-hidden rounded-md bg-[#201C1D]">
                {["Yes", "No"].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() =>
                      handleInputChange("hasDesign", val === "Yes")
                    }
                    className={`flex-1 sm:flex-none sm:w-32 md:w-36 lg:w-44 h-12 sm:h-14 lg:h-16 flex items-center justify-center font-medium transition-all ${
                      formData.hasDesign === (val === "Yes")
                        ? "bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] text-black text-base sm:text-lg lg:text-2xl"
                        : "text-gray-400 text-base sm:text-lg lg:text-2xl"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
              Project Details
            </label>
            <div
              className={`p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4 ${
                errors.projectDetails ? "border border-red-500" : ""
              }`}
            >
              <textarea
                placeholder="Tell us about your project, requirements, timeline, or anything else..."
                value={formData.projectDetails}
                onChange={(e) =>
                  handleInputChange("projectDetails", e.target.value)
                }
                rows={6}
                className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all resize-none block"
              />
            </div>
            {errors.projectDetails && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectDetails}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-base sm:text-lg lg:text-2xl text-gray-300">
              Questions for the Project
            </label>
            <div className="p-[1px] rounded-lg bg-gradient-to-br from-[#7E67C1] to-[#BBE4F6] mt-2 sm:mt-3 lg:mt-4">
              <textarea
                placeholder="Write down your questions about the project..."
                value={formData.questions}
                onChange={(e) => handleInputChange("questions", e.target.value)}
                rows={6}
                className="w-full px-3 py-3 sm:px-4 sm:py-4 lg:py-5 bg-[#201C1D] rounded-lg text-white text-base sm:text-lg lg:text-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7E67C1]/50 focus:border-transparent transition-all resize-none block"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#7E67C1] to-[#BBE4F6] text-black text-xl sm:text-2xl lg:text-3xl font-semibold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Send Message"}
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProjectInquiryForm;
export type { FormData };
