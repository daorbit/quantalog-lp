"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { SelectField } from "@/components/select-field";
import { site } from "@/lib/site";
import type { PublicFormField, PublicFormSchema } from "@/lib/forms-types";

type State = "idle" | "sending" | "error";

/** Reads UTM params off the current URL — the only attribution a hosted form
 *  gets in v1, since the visitor is on our domain and shares no
 *  `visitorHash` with the customer's own tracker. */
function readUtm(): { source?: string; medium?: string; campaign?: string } {
  if (typeof window === "undefined") return {};
  const qs = new URLSearchParams(window.location.search);
  const utm: { source?: string; medium?: string; campaign?: string } = {};
  const source = qs.get("utm_source");
  const medium = qs.get("utm_medium");
  const campaign = qs.get("utm_campaign");
  if (source) utm.source = source;
  if (medium) utm.medium = medium;
  if (campaign) utm.campaign = campaign;
  return utm;
}

export function HostedForm({
  formKey,
  schema,
}: {
  formKey: string;
  schema: PublicFormSchema;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (schema.status === "closed") {
    return (
      <div className="card p-7 text-center sm:p-8">
        {schema.settings.logoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={schema.settings.logoUrl} alt="" className="mx-auto mb-4 h-8 object-contain" />
        )}
        <h1 className="text-lg font-semibold">{schema.name}</h1>
        <p className="mt-3 text-sm text-fg-muted">
          {schema.settings.closedMessage || "This form is no longer accepting responses."}
        </p>
      </div>
    );
  }

  if (successMessage) {
    return (
      <div className="card p-7 text-center sm:p-8">
        <p className="text-sm text-fg-muted">{successMessage}</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const errors: Record<string, string> = {};
    const data: Record<string, string> = {};
    for (const field of schema.fields) {
      const raw = field.type === "checkbox"
        ? (formData.get(field.key) ? "true" : "")
        : String(formData.get(field.key) ?? "").trim();
      if (field.required && !raw) errors[field.key] = "This field is required.";
      data[field.key] = raw;
    }

    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setState("idle");
      return;
    }

    setFieldErrors({});
    setError("");
    setState("sending");

    try {
      const res = await fetch(`${site.api}/api/public/forms/${formKey}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          timingToken: schema.timingToken,
          website: formData.get("website") ?? "",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          utm: readUtm(),
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          body.error ||
            (res.status === 429
              ? "Too many submissions. Please try again later."
              : "Your submission could not be sent. Please try again.")
        );
      }

      if (body.redirectUrl) {
        window.location.href = body.redirectUrl;
        return;
      }
      setSuccessMessage(body.successMessage || schema.settings.successMessage || "Thanks — we got it.");
    } catch (err) {
      const network = err instanceof TypeError;
      setError(
        network
          ? "We could not reach the server. Check your connection and try again."
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
      );
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card p-7 sm:p-8">
      {schema.settings.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={schema.settings.logoUrl} alt="" className="mb-4 h-8 object-contain" />
      )}
      <h1 className="text-lg font-semibold">{schema.name}</h1>

      <div className="mt-6 space-y-5">
        {schema.fields.map((field) => (
          <FormFieldInput key={field.key} field={field} error={fieldErrors[field.key]} />
        ))}
      </div>

      {/* Honeypot — hidden via wrapper (not display:none on the input alone),
          never focusable, never announced. Bots that fill it are quietly
          accepted server-side rather than told they were caught. */}
      <div aria-hidden="true" tabIndex={-1} className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hf-website">Do not fill this in</label>
        <input id="hf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="timingToken" value={schema.timingToken} />

      {error && (
        <p role="alert" className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        style={schema.settings.primaryColor ? { backgroundColor: schema.settings.primaryColor } : undefined}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold text-accent-fg shadow-soft transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          schema.settings.submitText || "Submit"
        )}
      </button>

      {schema.showBranding && (
        <p className="mt-4 text-center text-xs text-fg-faint">
          Powered by{" "}
          <a href={site.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
            Quantalog
          </a>
        </p>
      )}
    </form>
  );
}

function FormFieldInput({ field, error }: { field: PublicFormField; error?: string }) {
  const label = `${field.label}${field.required ? " *" : ""}`;
  const id = `hf-${field.key}`;

  if (field.type === "textarea") {
    return (
      <Field label={label} htmlFor={id} error={error}>
        <textarea
          id={id}
          name={field.key}
          maxLength={field.maxLength}
          rows={4}
          aria-invalid={Boolean(error)}
          className="q-input resize-y"
        />
      </Field>
    );
  }

  if (field.type === "select") {
    return (
      <Field label={label} htmlFor={id} error={error}>
        <SelectField
          id={id}
          name={field.key}
          options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
          defaultValue={field.options?.[0] ?? ""}
        />
      </Field>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">{label}</legend>
        <div className="space-y-2">
          {(field.options ?? []).map((o) => (
            <label key={o} className="flex items-center gap-2 text-sm">
              <input type="radio" name={field.key} value={o} />
              {o}
            </label>
          ))}
        </div>
        {error && <FieldError id={id} error={error} />}
      </fieldset>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div>
        <label className="flex items-center gap-2 text-sm">
          <input id={id} type="checkbox" name={field.key} />
          {label}
        </label>
        {error && <FieldError id={id} error={error} />}
      </div>
    );
  }

  return (
    <Field label={label} htmlFor={id} error={error}>
      <input
        id={id}
        name={field.key}
        type={field.type === "number" ? "number" : field.type}
        maxLength={field.maxLength}
        aria-invalid={Boolean(error)}
        className="q-input"
      />
    </Field>
  );
}

function Field({
  label, htmlFor, error, children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <FieldError id={htmlFor} error={error} />}
    </div>
  );
}

function FieldError({ id, error }: { id: string; error: string }) {
  return (
    <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {error}
    </p>
  );
}
