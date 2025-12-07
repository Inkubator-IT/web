// Frontend form data interface (English field names)
export interface ContactFormData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  company: string;
  isAcademic: boolean;
  hearAbout: string[];
  othersSpecify: string;
  projectType: string;
  projectTypeOther?: string;
  projectPurpose: string;
  costExpectations: string;
  projectDeadline: string;
  hasDesign: boolean;
  projectDetails: string;
  questions: string;
}

// Backend API request interface (Indonesian field names)
export interface ClientInformationRequest {
  nama_lengkap: string;
  email: string;
  no_whatsapp: string | null;
  instansi: string | null;
  civitas_itb: boolean;
  jenis_proyek: string | null;
  tujuan_pembuatan_proyek: string | null;
  deskripsi_proyek: string | null;
  ekspetasi_biaya: string | null;
  deadline_proyek: string | null;
  sudah_memiliki_desain: boolean;
  pertanyaan_untuk_proyek: string | null;
  dimana_mengetahui_iit: string | null;
  rating_website: number | null;
  masukan_website: string | null;
  kode_promo: string | null;
}

// Validation errors interface
export interface ContactFormValidation {
  fullName?: string;
  email?: string;
  whatsappNumber?: string;
}

// Submission result interface
export interface SubmissionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}
