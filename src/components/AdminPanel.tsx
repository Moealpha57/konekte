"use client";

import { FormEvent, useMemo, useState } from "react";
import { getBrowserSupabase, hasSupabaseEnv } from "@/lib/supabase";
import { type Locale } from "@/lib/i18n";
import { mockApplications, mockComplaints } from "@/lib/mock-data";
import { LANGUAGES, NEIGHBORHOODS, SUBJECTS } from "@/lib/types";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "mariama@example.com";

export function AdminPanel({ locale = "fr" }: { locale?: Locale }) {
  void locale;
  const supabase = useMemo(() => getBrowserSupabase(), []);
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(!hasSupabaseEnv);
  const [status, setStatus] = useState(!hasSupabaseEnv ? "Mode aperçu: ajoutez Supabase pour activer l’écriture réelle." : "");
  const [submitting, setSubmitting] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return setStatus("Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) return setStatus(error.message);
    if (data.user?.email !== adminEmail) {
      await supabase.auth.signOut();
      setIsAuthed(false);
      return setStatus("Accès refusé: ce panneau est réservé à Mariama.");
    }
    setIsAuthed(true);
    setStatus("Connexion réussie. Vous pouvez ajouter un tuteur.");
  }

  async function addTutor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      school_affiliation: String(form.get("school_affiliation") ?? ""),
      photo_url: String(form.get("photo_url") ?? ""),
      subjects: form.getAll("subjects").map(String),
      hourly_rate_gnf: Number(form.get("hourly_rate_gnf") ?? 0),
      neighborhoods: form.getAll("neighborhoods").map(String),
      languages: form.getAll("languages").map(String),
      bio: String(form.get("bio") ?? ""),
      whatsapp: String(form.get("whatsapp") ?? ""),
      is_active: true,
    };
    if (!supabase || !hasSupabaseEnv) {
      setStatus("Aperçu seulement: le formulaire est prêt, mais Supabase n’est pas encore configuré.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("tutors").insert(payload);
    setSubmitting(false);
    setStatus(error ? error.message : "Tuteur ajouté avec succès.");
    if (!error) event.currentTarget.reset();
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={login} className="card p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">Connexion Mariama</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">Utilisez l’email Supabase Auth de Mariama. Aucun domaine ou mot de passe n’est codé en dur.</p>
        <label className="mt-5 grid gap-2"><span className="label">Email</span><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="mt-4 grid gap-2"><span className="label">Mot de passe</span><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></label>
        <button className="btn-primary mt-5 w-full" disabled={submitting} type="submit">{submitting ? "Connexion…" : "Se connecter"}</button>
        {status && <p className="mt-4 rounded-2xl bg-stone-100 p-3 text-sm text-stone-700">{status}</p>}
      </form>

      <form onSubmit={addTutor} className={`card p-5 sm:p-6 ${isAuthed ? "" : "opacity-60"}`}>
        <div className="flex items-start justify-between gap-3">
          <div><h2 className="text-xl font-semibold tracking-tight">Ajouter un tuteur</h2><p className="mt-2 text-sm text-stone-600">Champs v1: photo, nom, matières, tarif, quartiers, langues, bio et WhatsApp.</p></div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">{isAuthed ? "Actif" : "Verrouillé"}</span>
        </div>
        <fieldset disabled={!isAuthed || submitting} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2"><Field name="name" label="Nom" placeholder="Ex: Aminata Barry" /><Field name="school_affiliation" label="École / affiliation" placeholder="Université, lycée…" /></div>
          <Field name="photo_url" label="URL photo" placeholder="https://... ou URL Supabase Storage" />
          <div className="grid gap-4 sm:grid-cols-2"><Field name="hourly_rate_gnf" label="Tarif horaire GNF" type="number" placeholder="125000" /><Field name="whatsapp" label="WhatsApp" placeholder="2246..." /></div>
          <CheckGroup name="subjects" label="Matières" options={SUBJECTS} />
          <CheckGroup name="neighborhoods" label="Quartiers" options={NEIGHBORHOODS} />
          <CheckGroup name="languages" label="Langues" options={LANGUAGES} />
          <label className="grid gap-2"><span className="label">Bio courte</span><textarea className="input min-h-28" name="bio" placeholder="2–3 phrases sur l’expérience et le style du tuteur." /></label>
          <button className="btn-primary w-full sm:w-auto" type="submit">Enregistrer le tuteur</button>
        </fieldset>
      </form>
      </div>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Candidatures à vérifier</h2>
              <p className="mt-2 text-sm text-stone-600">Phase actuelle: Mariama/Konekte vérifie puis ajoute manuellement le profil public.</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">{mockApplications.length} en file</span>
          </div>
          <div className="mt-5 grid gap-3">
            {mockApplications.map((application) => (
              <article key={application.id} className="rounded-3xl border border-stone-200/70 bg-white/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{application.name}</p>
                  <span className="pill">{application.status}</span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{application.phone}</p>
                <div className="mt-3 flex flex-wrap gap-2">{application.subjects.map((subject) => <span className="pill" key={subject}>{subject}</span>)}</div>
                <p className="mt-3 text-sm leading-6 text-stone-600">{application.note}</p>
                <div className="mt-3 flex gap-2"><button className="btn-primary" type="button">Approuver</button><button className="btn-secondary" type="button">Rejeter</button></div>
              </article>
            ))}
          </div>
        </div>

        <div className="card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Qualité, plaintes et blacklist</h2>
              <p className="mt-2 text-sm text-stone-600">Si notes/plaintes deviennent mauvaises: pause, désactivation, puis blacklist interne.</p>
            </div>
            <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold text-white">Trust & Safety</span>
          </div>
          <div className="mt-5 grid gap-3">
            {mockComplaints.map((complaint) => (
              <article key={complaint.id} className="rounded-3xl border border-stone-200/70 bg-white/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{complaint.reason}</p>
                  <span className="pill">{complaint.severity}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">{complaint.details}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="btn-secondary" type="button">Mettre en pause</button>
                  <button className="btn-secondary" type="button">Désactiver</button>
                  <button className="btn-secondary" type="button">Blacklister</button>
                </div>
              </article>
            ))}
            <div className="rounded-3xl bg-stone-950 p-4 text-white">
              <p className="text-sm text-stone-300">Champs blacklist privés</p>
              <p className="mt-2 text-sm leading-6">Téléphone, email, WhatsApp, nom, photo, preuve/ID si disponible, raison, date et admin responsable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ name, label, placeholder, type = "text" }: { name: string; label: string; placeholder?: string; type?: string }) {
  return <label className="grid gap-2"><span className="label">{label}</span><input className="input" name={name} type={type} placeholder={placeholder} /></label>;
}

function CheckGroup({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <p className="label mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{options.map((option) => <label key={option} className="pill cursor-pointer gap-2"><input type="checkbox" name={name} value={option} className="accent-emerald-900" /> {option}</label>)}</div>
    </div>
  );
}
