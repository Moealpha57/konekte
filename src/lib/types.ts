export type TutorStatus = "pending_review" | "active" | "paused" | "deactivated" | "blacklisted";

export type Tutor = {
  id: string;
  created_at?: string;
  name: string;
  school_affiliation?: string | null;
  photo_url?: string | null;
  subjects: string[];
  hourly_rate_gnf: number;
  neighborhoods: string[];
  languages: string[];
  bio: string;
  whatsapp: string;
  is_active?: boolean;
  status?: TutorStatus;
  rating_average?: number;
  rating_count?: number;
  verified?: boolean;
  response_badge?: string;
};

export type Review = {
  id: string;
  tutor_id: string;
  parent_name: string;
  rating: number;
  comment: string;
  tags: string[];
  created_at: string;
  is_approved: boolean;
};

export type Complaint = {
  id: string;
  tutor_id: string;
  parent_name: string;
  reason: string;
  details: string;
  status: "new" | "reviewing" | "resolved";
  severity: "low" | "medium" | "high";
};

export type TutorApplication = {
  id: string;
  name: string;
  phone: string;
  subjects: string[];
  status: "new" | "verifying" | "approved" | "rejected";
  note: string;
};

export const SUBJECTS = ["Tutoring", "Housekeeping", "Babysitting"];
export const FUTURE_SUBJECTS = ["Photography", "Web design", "Website creation"];
export const SERVICE_LABELS = {
  fr: {
    Tutoring: "Tutorat",
    Housekeeping: "Ménage",
    Babysitting: "Baby-sitting",
    Photography: "Photographie",
    "Web design": "Web design",
    "Website creation": "Création de sites",
  },
  en: {
    Tutoring: "Tutoring",
    Housekeeping: "Housekeeping",
    Babysitting: "Babysitting",
    Photography: "Photography",
    "Web design": "Web design",
    "Website creation": "Website creation",
  },
} as const;
export const NEIGHBORHOODS = ["Lambanyi", "Kipé", "Nongo", "Taouyah", "Ratoma", "Dixinn"];
export const LANGUAGES = ["Français", "English", "Pular", "Soussou", "Maninka"];
export const REVIEW_TAGS = ["Patient", "On time", "Clear explanations", "Good with kids", "Professional", "Responsive"];
export const REVIEW_TAG_LABELS = {
  fr: { Patient: "Patient", "On time": "Ponctuel", "Clear explanations": "Explications claires", "Good with kids": "Bon avec les enfants", Professional: "Professionnel", Responsive: "Réactif" },
  en: { Patient: "Patient", "On time": "On time", "Clear explanations": "Clear explanations", "Good with kids": "Good with kids", Professional: "Professional", Responsive: "Responsive" },
} as const;
export const COMPLAINT_REASONS = ["No-show", "Unprofessional behavior", "Safety concern", "Wrong qualifications", "Price changed", "Bad service quality", "Slow responses", "Fraud/scam concern", "Other"];
export const COMPLAINT_REASON_LABELS = {
  fr: { "No-show": "Absence / no-show", "Unprofessional behavior": "Comportement non professionnel", "Safety concern": "Problème de sécurité", "Wrong qualifications": "Qualifications incorrectes", "Price changed": "Prix changé", "Bad service quality": "Mauvaise qualité", "Slow responses": "Réponses lentes", "Fraud/scam concern": "Fraude / arnaque", Other: "Autre" },
  en: { "No-show": "No-show", "Unprofessional behavior": "Unprofessional behavior", "Safety concern": "Safety concern", "Wrong qualifications": "Wrong qualifications", "Price changed": "Price changed", "Bad service quality": "Bad service quality", "Slow responses": "Slow responses", "Fraud/scam concern": "Fraud/scam concern", Other: "Other" },
} as const;
