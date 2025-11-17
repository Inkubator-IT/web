"use client";

import React, { useState } from "react";
import ProjectInquiryForm, {
  FormData,
} from "./components/project-inquiry-form";

interface ApiPayload {
  nama_lengkap: string;
  email: string;
  no_whatsapp: string;
  instansi: string;
  civitas_itb: boolean;
  jenis_proyek: string;
  tujuan_pembuatan_proyek: string;
  deskripsi_proyek: string;
  ekspetasi_biaya: string;
  deadline_proyek: string;
  sudah_memiliki_desain: boolean;
  pertanyaan_untuk_proyek: string;
  dimana_mengetahui_iit: string;
  rating_website: null;
  masukan_website: null;
  kode_promo: null;
}

const transformDataForAPI = (data: FormData): ApiPayload => {
  const finalProjectType = data.projectType === "Others" ? data.projectTypeOther || "Others" : data.projectType;
  
  let hearAboutString = data.hearAbout.join(', ');
  if (data.hearAbout.includes("Others") && data.othersSpecify) {
    hearAboutString += ` (Lainnya: ${data.othersSpecify})`;
  }

  return {
    nama_lengkap: data.fullName,
    email: data.email,
    no_whatsapp: data.whatsappNumber,
    instansi: data.company,
    civitas_itb: data.isAcademic,
    jenis_proyek: finalProjectType,
    tujuan_pembuatan_proyek: data.projectPurpose,
    deskripsi_proyek: data.projectDetails,
    ekspetasi_biaya: data.costExpectations,
    deadline_proyek: data.projectDeadline,
    sudah_memiliki_desain: data.hasDesign,
    pertanyaan_untuk_proyek: data.questions,
    dimana_mengetahui_iit: hearAboutString,
    rating_website: null,
    masukan_website: null,
    kode_promo: null,
  };
};

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const apiPayload = transformDataForAPI(formData);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const endpoint = `${API_URL}/api/client-information`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();

      if (!response.ok || result.success === false) {
        // Ambil error dari backend (jika ada)
        throw new Error(result.error || "Gagal mengirim data.");
      }

      // Sukses
      setSubmitSuccess(true);
      // Reset form
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

    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
          {submitSuccess && (
            <div className="mb-4 p-4 text-center rounded-lg bg-green-800 border border-green-600 text-white">
              <p className="font-semibold">Pesan Terkirim!</p>
              <p>Terima kasih telah menghubungi kami. Kami akan segera merespon.</p>
            </div>
          )}
          {submitError && (
            <div className="mb-4 p-4 text-center rounded-lg bg-red-800 border border-red-600 text-white">
              <p className="font-semibold">Gagal Mengirim</p>
              <p>{submitError}</p>
            </div>
          )}
          <ProjectInquiryForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectInquiryPage;
