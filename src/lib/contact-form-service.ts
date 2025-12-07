import { apiClient } from "@/lib/api-client";
import type {
  ContactFormData,
  ClientInformationRequest,
  ContactFormValidation,
  SubmissionResult,
} from "@/types/contact";

export function validateFormData(
  data: ContactFormData,
): ContactFormValidation {
  const errors: ContactFormValidation = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Full name is required (minimum 2 characters)";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Valid email address is required";
  }

  if (!data.whatsappNumber || data.whatsappNumber.trim().length === 0) {
    errors.whatsappNumber = "WhatsApp number is required";
  }

  return errors;
}

export function transformFormData(
  data: ContactFormData,
): ClientInformationRequest {
  let hearAboutString = data.hearAbout.join(", ");
  if (data.hearAbout.includes("Others") && data.othersSpecify) {
    hearAboutString = hearAboutString.replace(
      "Others",
      `Others (${data.othersSpecify})`,
    );
  }

  const projectType =
    data.projectType === "Others" && data.projectTypeOther
      ? data.projectTypeOther
      : data.projectType;

  const emptyToNull = (value: string | undefined | null): string | null => {
    return value && value.trim() !== "" ? value.trim() : null;
  };

  return {
    nama_lengkap: data.fullName.trim(),
    email: data.email.trim(),
    no_whatsapp: data.whatsappNumber.trim(),

    instansi: emptyToNull(data.company),
    civitas_itb: Boolean(data.isAcademic),
    jenis_proyek: emptyToNull(projectType),
    tujuan_pembuatan_proyek: emptyToNull(data.projectPurpose),
    deskripsi_proyek: emptyToNull(data.projectDetails),
    ekspetasi_biaya: emptyToNull(data.costExpectations),
    deadline_proyek: emptyToNull(data.projectDeadline),
    sudah_memiliki_desain: Boolean(data.hasDesign),
    pertanyaan_untuk_proyek: emptyToNull(data.questions),
    dimana_mengetahui_iit: emptyToNull(hearAboutString),

    rating_website: 0,
    masukan_website: "",
    kode_promo: "",
  };
}

async function submitToDatabase(
  data: ClientInformationRequest,
): Promise<SubmissionResult> {
  try {
    const response = await apiClient.post<{ success: boolean; data?: unknown }>(
      "/client-information",
      data,
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Database submission failed:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to submit to database",
    );
  }
}

async function submitToAppSheet(data: ContactFormData): Promise<void> {
  const appsheetUrl = process.env.NEXT_PUBLIC_APPSHEET_URL;

  if (!appsheetUrl || appsheetUrl.trim() === "") {
    console.warn("AppSheet URL not configured, skipping Google Sheets submission");
    return;
  }

  try {
    const params = new URLSearchParams();

    params.set("name", data.fullName);
    params.set("email", data.email);
    params.set("whatsapp", data.whatsappNumber);
    params.set("institution", data.company);
    params.set("isITB", data.isAcademic ? "Ya" : "Tidak");

    const projectType = data.projectType === "Others" && data.projectTypeOther
      ? data.projectTypeOther
      : data.projectType;
    params.set("type", projectType);

    params.set("purpose", data.projectPurpose);
    params.set("description", data.projectDetails);
    params.set("budget", data.costExpectations);
    params.set("deadline", data.projectDeadline);
    params.set("hasDesign", data.hasDesign ? "Ya" : "Tidak");
    params.set("question", data.questions);

    if (data.hearAbout.length > 0) {
      let hearAboutString = data.hearAbout.join(", ");
      if (data.hearAbout.includes("Others") && data.othersSpecify) {
        hearAboutString = hearAboutString.replace("Others", `Others (${data.othersSpecify})`);
      }

      data.hearAbout.forEach(item => {
        let refererValue = item;
        if (item === "Others" && data.othersSpecify) {
          refererValue = `Others (${data.othersSpecify})`;
        }
        params.append("referer", refererValue);
      });
    }

    params.set("rating", "");
    params.set("feedback", "");
    params.set("promoCode", "");

    const fullUrl = `${appsheetUrl}?${params.toString()}`;

    await fetch(fullUrl, {
      method: "GET",
      mode: "no-cors",
      keepalive: true,
    });

    console.log("AppSheet submission completed");
  } catch (error) {
    console.error("AppSheet submission failed (non-blocking):", error);
  }
}

async function submitToBot(data: ContactFormData): Promise<void> {
  const botUrl = `${process.env.NEXT_PUBLIC_BOT_URL}/api/project_request`;

  if (!botUrl || botUrl.includes("undefined") || botUrl.trim() === "/api/project_request") {
    console.warn("Bot URL not configured, skipping bot notification");
    return;
  }

  const formatDeadline = (days: string): string => {
    if (!days || days.trim() === "") return "";
    const daysNum = parseInt(days);
    if (isNaN(daysNum)) return "";

    const date = new Date();
    date.setDate(date.getDate() + daysNum);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };

  const projectType = data.projectType === "Others" && data.projectTypeOther
    ? data.projectTypeOther
    : data.projectType;

  try {
    await fetch(botUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.fullName,
        instance: data.company,
        isStudent: data.isAcademic ? "Ya" : "Tidak",
        email: data.email,
        whatsapp: data.whatsappNumber,
        type: [projectType],
        motive: data.projectPurpose,
        description: data.projectDetails,
        fee: data.costExpectations,
        deadline: formatDeadline(data.projectDeadline),
        isDesignExist: data.hasDesign ? "Ya" : "Tidak",
        question: data.questions,
      }),
    });

    console.log("Bot notification sent successfully");
  } catch (error) {
    console.error("Bot notification failed (non-blocking):", error);
  }
}

export async function submitContactForm(
  data: ContactFormData,
): Promise<SubmissionResult> {
  const transformedData = transformFormData(data);

  const dbResult = await submitToDatabase(transformedData);

  Promise.allSettled([submitToAppSheet(data), submitToBot(data)]).then(
    (results) => {
      results.forEach((result, index) => {
        const name = index === 0 ? "AppSheet" : "Bot";
        if (result.status === "rejected") {
          console.error(`${name} submission failed:`, result.reason);
        }
      });
    },
  );

  return dbResult;
}
