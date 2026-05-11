-- Konekte v1 Supabase schema
-- 1) Create Supabase Auth user for Mariama manually in Dashboard.
-- 2) Replace mariama@example.com below with her real auth email before running.
-- 3) Create storage bucket: tutor-photos (public read).

create extension if not exists pgcrypto;

create table if not exists public.tutors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  school_affiliation text,
  photo_url text,
  subjects text[] not null default '{}',
  hourly_rate_gnf integer not null check (hourly_rate_gnf >= 0),
  neighborhoods text[] not null default '{}',
  languages text[] not null default '{}',
  bio text not null,
  whatsapp text not null,
  is_active boolean not null default true
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tutors_set_updated_at on public.tutors;
create trigger tutors_set_updated_at
before update on public.tutors
for each row execute function public.set_updated_at();

alter table public.tutors enable row level security;

drop policy if exists "Public can read active tutors" on public.tutors;
create policy "Public can read active tutors"
on public.tutors for select
using (is_active = true);

drop policy if exists "Mariama can manage tutors" on public.tutors;
create policy "Mariama can manage tutors"
on public.tutors for all
to authenticated
using ((auth.jwt() ->> 'email') = 'mariama@example.com')
with check ((auth.jwt() ->> 'email') = 'mariama@example.com');

insert into public.tutors (name, school_affiliation, photo_url, subjects, hourly_rate_gnf, neighborhoods, languages, bio, whatsapp)
values
('Aïssatou Diallo', 'Université Gamal Abdel Nasser', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80', array['Mathématiques','Sciences'], 125000, array['Lambanyi','Kipé'], array['Français','Pular'], 'Étudiante en sciences avec une approche patiente et structurée pour les élèves du collège et du lycée.', '224600000001'),
('Mamadou Bah', 'Professeur indépendant', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80', array['Français','Anglais'], 100000, array['Nongo','Taouyah'], array['Français','Anglais','Soussou'], 'Professeur expérimenté, spécialisé dans la remise à niveau et la préparation aux examens.', '224600000002')
on conflict do nothing;

-- Storage policies (run after creating public bucket tutor-photos)
-- insert/update/delete are also restricted to Mariama's authenticated account.
drop policy if exists "Public can view tutor photos" on storage.objects;
create policy "Public can view tutor photos" on storage.objects
for select using (bucket_id = 'tutor-photos');

drop policy if exists "Mariama can upload tutor photos" on storage.objects;
create policy "Mariama can upload tutor photos" on storage.objects
for insert to authenticated
with check (bucket_id = 'tutor-photos' and (auth.jwt() ->> 'email') = 'mariama@example.com');

drop policy if exists "Mariama can update tutor photos" on storage.objects;
create policy "Mariama can update tutor photos" on storage.objects
for update to authenticated
using (bucket_id = 'tutor-photos' and (auth.jwt() ->> 'email') = 'mariama@example.com')
with check (bucket_id = 'tutor-photos' and (auth.jwt() ->> 'email') = 'mariama@example.com');

drop policy if exists "Mariama can delete tutor photos" on storage.objects;
create policy "Mariama can delete tutor photos" on storage.objects
for delete to authenticated
using (bucket_id = 'tutor-photos' and (auth.jwt() ->> 'email') = 'mariama@example.com');
