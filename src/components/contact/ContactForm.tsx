"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

// Must match the form in public/__forms.html, which Netlify reads at deploy.
const FORM_NAME = "contact";

const input =
  "mt-2 block w-full rounded-md border border-border-strong bg-white px-3.5 text-[15px] text-ink";

/**
 * Netlify Forms over fetch: native validation runs first, then the fields are
 * posted to /__forms.html and the result shows inline (no page redirect).
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      // All fields are text; keep string entries so the body is plain URL-encoded.
      const body = new URLSearchParams(
        [...new FormData(form)].filter(
          (entry): entry is [string, string] => typeof entry[1] === "string",
        ),
      );
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form name={FORM_NAME} onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value={FORM_NAME} />

      {/* Honeypot: hidden from people, filled in by bots; Netlify drops those submissions. */}
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className={`${input} h-12`}
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`${input} h-12`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          className={`${input} py-3 leading-relaxed`}
        />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-ink px-6 text-[15px] font-medium text-white hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-[13px] text-muted">
          Protected from spam. Your details are only used to reply.
        </p>
      </div>

      {/* Announced by screen readers when the status changes. */}
      <div aria-live="polite" className="text-[15px]">
        {status === "success" && (
          <p className="rounded-md bg-surface px-4 py-3 text-ink">
            Thanks, your message was sent. I&apos;ll reply within two business
            days.
          </p>
        )}
        {status === "error" && (
          <p className="rounded-md border border-border-strong px-4 py-3 text-ink">
            Sorry, the message didn&apos;t send. Please try again, or reach me
            on LinkedIn.
          </p>
        )}
      </div>
    </form>
  );
}
