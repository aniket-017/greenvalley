export const WHATSAPP_INQUIRY_NUMBER = "918055314123";

const STANDARD_LABELS = {
  "1st": "1st Standard",
  "2nd": "2nd Standard",
  "3rd": "3rd Standard",
  "4th": "4th Standard",
  "5th": "5th Standard",
  "6th": "6th Standard",
  "7th": "7th Standard",
  "8th": "8th Standard",
  "9th": "9th Standard",
  "10th": "10th Standard",
  "11th": "11th Standard",
  "12th": "12th Standard",
};

function labelFor(value, labels) {
  return labels[value] || value || "—";
}

export function buildDemoInquiryMessage(formData) {
  const lines = [
    "*New Demo Class Inquiry*",
    "",
    `Student: ${formData.studentName.trim()}`,
    `Parent: ${formData.parentName.trim() || "—"}`,
    `Phone: ${formData.phone.trim()}`,
    `Standard: ${labelFor(formData.standard, STANDARD_LABELS)}`,
    `Message: ${formData.message.trim() || "—"}`,
    "",
    "— Sent via gmsetc.in",
  ];

  return lines.join("\n");
}

export function openWhatsAppInquiry(formData) {
  const message = buildDemoInquiryMessage(formData);
  openWhatsAppMessage(message);
}

const ENQUIRY_TYPE_LABELS = {
  admissions: "Admissions / Enrolment",
  academics: "Academic Programmes",
  fees: "Fee Information",
  general: "General Enquiry",
};

export function buildSchoolContactMessage(formData) {
  const lines = [
    "*New School Enquiry*",
    "",
    `Name: ${formData.name.trim()}`,
    `Phone: ${formData.phone.trim()}`,
    `Enquiry Type: ${labelFor(formData.enquiryType, ENQUIRY_TYPE_LABELS)}`,
    `Message: ${formData.message.trim() || "—"}`,
    "",
    "— Sent via gmsetc.in",
  ];

  return lines.join("\n");
}

export function openWhatsAppSchoolContact(formData) {
  const message = buildSchoolContactMessage(formData);
  openWhatsAppMessage(message);
}

function openWhatsAppMessage(message) {
  const url = `https://wa.me/${WHATSAPP_INQUIRY_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
