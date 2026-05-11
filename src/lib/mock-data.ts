import type { Complaint, Review, Tutor, TutorApplication } from "./types";

export const mockTutors: Tutor[] = [
  {
    id: "aissatou-diallo",
    name: "Aïssatou Diallo",
    school_affiliation: "Université Gamal Abdel Nasser",
    photo_url: "/avatars/aissatou.svg",
    subjects: ["Tutoring"],
    hourly_rate_gnf: 125000,
    neighborhoods: ["Lambanyi", "Kipé"],
    languages: ["Français", "Pular"],
    bio: "Prestataire vérifiée pour le tutorat familial, avec une approche patiente et structurée. Elle aide les familles à garder un rythme simple: diagnostic, exercices ciblés, puis suivi hebdomadaire.",
    whatsapp: "224600000001",
    is_active: true,
    status: "active",
    rating_average: 4.9,
    rating_count: 18,
    verified: true,
    response_badge: "Répond vite",
  },
  {
    id: "mamadou-bah",
    name: "Mamadou Bah",
    school_affiliation: "Professeur indépendant",
    photo_url: "/avatars/mamadou.svg",
    subjects: ["Photography", "Web design"],
    hourly_rate_gnf: 100000,
    neighborhoods: ["Nongo", "Taouyah"],
    languages: ["Français", "Anglais", "Soussou"],
    bio: "Créatif local disponible pour photographie simple, portraits et petits besoins web. Il privilégie une communication claire, un prix transparent et une livraison rapide.",
    whatsapp: "224600000002",
    is_active: true,
    status: "active",
    rating_average: 4.7,
    rating_count: 11,
    verified: true,
    response_badge: "Top noté",
  },
  {
    id: "fatoumata-camara",
    name: "Fatoumata Camara",
    school_affiliation: "Institut Supérieur des Sciences de l'Éducation",
    photo_url: "/avatars/fatoumata.svg",
    subjects: ["Housekeeping", "Website creation"],
    hourly_rate_gnf: 150000,
    neighborhoods: ["Dixinn", "Ratoma"],
    languages: ["Français", "Maninka"],
    bio: "Prestataire polyvalente pour housekeeping et création de sites simples. Les clients reçoivent un point clair avant et après chaque service.",
    whatsapp: "224600000003",
    is_active: true,
    status: "active",
    rating_average: 4.8,
    rating_count: 9,
    verified: true,
    response_badge: "Vérifiée",
  },
];

export const mockReviews: Review[] = [
  { id: "r1", tutor_id: "aissatou-diallo", parent_name: "Parent à Kipé", rating: 5, comment: "Très patiente et professionnelle. Le service était clair et bien organisé.", tags: ["Patient", "Clear explanations", "Professional"], created_at: "2026-05-01", is_approved: true },
  { id: "r2", tutor_id: "aissatou-diallo", parent_name: "Famille Diallo", rating: 5, comment: "Ponctuelle et bonne communication après le service.", tags: ["On time", "Responsive"], created_at: "2026-04-22", is_approved: true },
  { id: "r3", tutor_id: "mamadou-bah", parent_name: "Parent à Nongo", rating: 4, comment: "Bonne communication, travail propre et délai respecté.", tags: ["Clear explanations", "Good with kids"], created_at: "2026-04-18", is_approved: true },
  { id: "r4", tutor_id: "fatoumata-camara", parent_name: "Famille Camara", rating: 5, comment: "Très méthodique. On recommande.", tags: ["Professional", "Clear explanations"], created_at: "2026-04-12", is_approved: true },
];

export const mockComplaints: Complaint[] = [
  { id: "c1", tutor_id: "mamadou-bah", parent_name: "Parent masqué", reason: "Slow responses", details: "Watch item: response delay after WhatsApp contact.", status: "reviewing", severity: "low" },
];

export const mockApplications: TutorApplication[] = [
  { id: "app1", name: "Ibrahima Sow", phone: "+224 622 000 010", subjects: ["Tutoring", "Web design"], status: "verifying", note: "Verify affiliation + photo before publishing." },
  { id: "app2", name: "Mariame Barry", phone: "+224 623 000 022", subjects: ["Photography", "Web design"], status: "new", note: "New application to call." },
];
