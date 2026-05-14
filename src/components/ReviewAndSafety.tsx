"use client";

import { FormEvent, useState } from "react";
import type { Review, Tutor } from "@/lib/types";
import { COMPLAINT_REASON_LABELS, COMPLAINT_REASONS, REVIEW_TAG_LABELS, REVIEW_TAGS } from "@/lib/types";
import { copy, type Locale } from "@/lib/i18n";
import { localizeReview } from "@/lib/localized";
import { SmoothSelect } from "@/components/SmoothSelect";

export function ReviewAndSafety({ tutor, reviews, locale = "fr" }: { tutor: Tutor; reviews: Review[]; locale?: Locale }) {
  const t = copy[locale];
  const [reviewStatus, setReviewStatus] = useState("");
  const [complaintStatus, setComplaintStatus] = useState("");
  const localizedReviews = reviews.map((review) => localizeReview(review, locale));
  const tagLabel = (tag: string) => REVIEW_TAG_LABELS[locale][tag as keyof typeof REVIEW_TAG_LABELS.en] ?? tag;

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setReviewStatus(t.reviewStatus);
    event.currentTarget.reset();
  }

  function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplaintStatus(t.complaintStatus);
    event.currentTarget.reset();
  }

  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-emerald-900">{t.qualityVerified}</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{t.customerReviews}</h2>
          </div>
          <div className="rounded-2xl border px-4 py-3" style={{ background: "var(--accent-soft)", borderColor: "var(--line)", color: "var(--foreground)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{t.averageRating}</p>
            <p className="text-2xl font-semibold" style={{ color: "var(--accent)" }}>★ {tutor.rating_average?.toFixed(1) ?? "—"} <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>({tutor.rating_count ?? reviews.length})</span></p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {localizedReviews.map((review) => (
            <article key={review.id} className="rounded-3xl border p-4" style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{review.parent_name}</p>
                <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{"★".repeat(review.rating)}<span style={{ color: "var(--line)" }}>{"★".repeat(5 - review.rating)}</span></p>
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-600">{review.comment}</p>
              <div className="mt-3 flex flex-wrap gap-2">{review.tags.map((tag) => <span className="pill" key={tag}>{tagLabel(tag)}</span>)}</div>
            </article>
          ))}
        </div>

        <form onSubmit={submitReview} className="mt-5 rounded-3xl border p-4" style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}>
          <h3 className="font-semibold">{t.leaveReview}</h3>
          <p className="mt-1 text-sm text-stone-600">{t.reviewHelper}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input className="input" name="parent" placeholder={t.parentNamePlaceholder} required />
            <SmoothSelect
              name="rating"
              defaultValue="5"
              options={[5, 4, 3, 2, 1].map((rating) => ({ value: String(rating), label: t.ratingOption(rating) }))}
              required
            />
          </div>
          <textarea className="input mt-3 min-h-24" name="comment" placeholder={t.reviewCommentPlaceholder} required />
          <div className="mt-3 flex flex-wrap gap-2">{REVIEW_TAGS.map((tag) => <label key={tag} className="pill cursor-pointer gap-2"><input name="tags" value={tag} type="checkbox" style={{ accentColor: "var(--accent)" }} /> {tagLabel(tag)}</label>)}</div>
          <button className="btn-primary mt-4" type="submit">{t.submitReview}</button>
          {reviewStatus && <p className="mt-3 rounded-2xl p-3 text-sm" style={{ background: "var(--accent-soft)", color: "var(--foreground)" }}>{reviewStatus}</p>}
        </form>
      </div>

      <div className="card p-5 sm:p-6">
        <p className="text-sm font-semibold text-emerald-900">{t.safetyTitle}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{t.reportProblem}</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">{t.reportBody}</p>
        <form onSubmit={submitComplaint} className="mt-5 grid gap-3">
          <input className="input" name="parent" placeholder={t.reportNamePlaceholder} required />
          <SmoothSelect
            name="reason"
            options={COMPLAINT_REASONS.map((reason) => ({ value: reason, label: COMPLAINT_REASON_LABELS[locale][reason as keyof typeof COMPLAINT_REASON_LABELS.en] ?? reason }))}
            required
          />
          <textarea className="input min-h-28" name="details" placeholder={t.reportDetailsPlaceholder} required />
          <button className="btn-secondary" type="submit">{t.sendPrivateReport}</button>
        </form>
        {complaintStatus && <p className="mt-3 rounded-2xl p-3 text-sm" style={{ background: "var(--accent-soft)", color: "var(--foreground)" }}>{complaintStatus}</p>}
        <div className="mt-5 rounded-3xl border p-4" style={{ background: "var(--surface-strong)", borderColor: "var(--line)" }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{t.qualityRule}</p>
          <p className="mt-2 text-sm leading-6">{t.qualityRuleBody}</p>
        </div>
      </div>
    </section>
  );
}
