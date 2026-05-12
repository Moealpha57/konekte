import { createClient } from "@supabase/supabase-js";
import type { Review, Tutor } from "./types";
import { mockReviews, mockTutors } from "./mock-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const hasSupabaseEnv = Boolean(url && anonKey && !url.includes("your-project"));

export function getBrowserSupabase() {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}

export function getServerSupabase() {
  if (!url || !anonKey || !hasSupabaseEnv) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export async function getTutors(filters?: { subject?: string; neighborhood?: string; language?: string }) {
  const supabase = getServerSupabase();
  if (!supabase) return filterTutors(mockTutors, filters);

  let query = supabase.from("tutors").select("*").eq("is_active", true).eq("status", "active").order("created_at", { ascending: false });
  if (filters?.subject) query = query.contains("subjects", [filters.subject]);
  if (filters?.neighborhood) query = query.contains("neighborhoods", [filters.neighborhood]);
  if (filters?.language) query = query.contains("languages", [filters.language]);

  const { data, error } = await query;
  if (error) {
    console.error("Provider query failed, using local profiles", error.message);
    return filterTutors(mockTutors, filters);
  }
  return (data ?? []) as Tutor[];
}

export async function getTutor(id: string) {
  const supabase = getServerSupabase();
  if (!supabase) return mockTutors.find((t) => t.id === id) ?? null;

  const { data, error } = await supabase.from("tutors").select("*").eq("id", id).eq("is_active", true).eq("status", "active").single();
  if (error) return mockTutors.find((t) => t.id === id) ?? null;
  return data as Tutor;
}

export async function getReviews(tutorId: string) {
  const supabase = getServerSupabase();
  if (!supabase) return mockReviews.filter((review) => review.tutor_id === tutorId && review.is_approved);

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("tutor_id", tutorId)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });
  if (error) return mockReviews.filter((review) => review.tutor_id === tutorId && review.is_approved);
  return (data ?? []) as Review[];
}

function filterTutors(tutors: Tutor[], filters?: { subject?: string; neighborhood?: string; language?: string }) {
  return tutors.filter((t) =>
    (t.status ?? "active") === "active" &&
    (!filters?.subject || t.subjects.includes(filters.subject)) &&
    (!filters?.neighborhood || t.neighborhoods.includes(filters.neighborhood)) &&
    (!filters?.language || t.languages.includes(filters.language))
  );
}
