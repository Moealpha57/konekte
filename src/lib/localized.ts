import type { Locale } from "./i18n";
import type { Review, Tutor } from "./types";

const tutorMeta: Record<string, Partial<Record<Locale, Partial<Tutor>>>> = {
  "aissatou-diallo": {
    en: {
      school_affiliation: "Gamal Abdel Nasser University",
      bio: "Verified tutoring provider for families, with a patient and structured approach. She helps families keep a simple rhythm: diagnose the need, focus exercises, then follow up weekly.",
      response_badge: "Fast response",
    },
  },
  "mamadou-bah": {
    en: {
      school_affiliation: "Independent provider",
      bio: "Local creative available for simple photography, portraits, and small web needs. He focuses on clear communication, transparent pricing, and quick delivery.",
      response_badge: "Top rated",
    },
  },
  "fatoumata-camara": {
    en: {
      school_affiliation: "Verified local provider",
      bio: "Versatile provider for housekeeping and simple website creation. Customers receive a clear check-in before and after each service.",
      response_badge: "Verified",
    },
  },
};

const reviewMeta: Record<string, Partial<Record<Locale, Partial<Review>>>> = {
  r1: { en: { parent_name: "Customer in Kipé", comment: "Very patient and professional. The service was clear and well organized." } },
  r2: { en: { parent_name: "Diallo family", comment: "On time with good communication after the service." } },
  r3: { en: { parent_name: "Customer in Nongo", comment: "Good communication, clean work, and the timeline was respected." } },
  r4: { en: { parent_name: "Camara family", comment: "Very methodical. Recommended." } },
};

export function localizeTutor(tutor: Tutor, locale: Locale): Tutor {
  return { ...tutor, ...(tutorMeta[tutor.id]?.[locale] ?? {}) };
}

export function localizeReview(review: Review, locale: Locale): Review {
  return { ...review, ...(reviewMeta[review.id]?.[locale] ?? {}) };
}
