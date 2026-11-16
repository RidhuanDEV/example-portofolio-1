"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { contactPayloadSchema } from "@/lib/validation";

interface ContactCopy {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  successTitle: string;
  successMessage: string;
  errorMessage: string;
  sendAnother: string;
}

interface ContactFormProps {
  copy: ContactCopy;
}

const apiErrorSchema = z.object({
  error: z.string().optional(),
});

export function ContactForm({ copy }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorText(null);

    const parsed = contactPayloadSchema.safeParse({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (!parsed.success) {
      setStatus("error");
      setErrorText(parsed.error.issues[0]?.message ?? copy.errorMessage);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const rawJson: unknown = await response.json();
        const errParsed = apiErrorSchema.safeParse(rawJson);
        setStatus("error");
        setErrorText(
          errParsed.success && errParsed.data.error ? errParsed.data.error : copy.errorMessage,
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorText(copy.errorMessage);
    }
  }

  if (status === "success") {
    return (
      <div className="grid gap-4 card-hover-lift border border-teal-300/40 bg-white/[0.025] p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 shrink-0 text-teal-200" size={20} />
          <div>
            <h2 className="text-lg font-semibold text-white">{copy.successTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{copy.successMessage}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 w-fit border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-200 btn-hover-lift"
        >
          {copy.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 card-hover-lift border border-white/10 bg-white/[0.025] p-5"
      noValidate
    >
      {status === "error" && errorText ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 shrink-0" size={16} />
          <span>{errorText}</span>
        </div>
      ) : null}

      <label className="grid gap-2 text-sm text-zinc-300">
        {copy.name}
        <input
          name="name"
          required
          minLength={2}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        {copy.email}
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
        />
      </label>
      <label className="grid gap-2 text-sm text-zinc-300">
        {copy.message}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border border-white/10 bg-[#0c0e11] px-3 py-2 text-white outline-none focus:border-teal-300/50"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 bg-teal-200 px-4 py-2.5 text-sm font-medium text-zinc-950 btn-hover-lift disabled:opacity-60"
      >
        {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
        {status === "submitting" ? copy.sending : copy.send}
      </button>
    </form>
  );
}
