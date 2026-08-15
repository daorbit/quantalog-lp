import type { Metadata } from "next";
import { site } from "@/lib/site";
import { HostedForm } from "@/components/hosted-form";
import type { PublicFormSchema } from "@/lib/forms-types";

type Params = { formKey: string };

// Hosted forms are per-visitor and change as fields are edited in the
// dashboard — nothing here can be prerendered at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Form",
  robots: { index: false, follow: false },
};

async function getSchema(formKey: string): Promise<PublicFormSchema | null | "not-found"> {
  try {
    const res = await fetch(`${site.api}/api/public/forms/${formKey}`, {
      cache: "no-store",
    });
    if (res.status === 404) return "not-found";
    if (!res.ok) return null;
    return (await res.json()) as PublicFormSchema;
  } catch {
    return null;
  }
}

export default async function HostedFormPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { formKey } = await params;
  const schema = await getSchema(formKey);

  if (schema === "not-found") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <h1 className="text-xl font-semibold">Form not found</h1>
        <p className="mt-2 text-sm text-fg-muted">
          This link may be out of date, or the form has been deleted.
        </p>
      </div>
    );
  }

  if (!schema) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-fg-muted">Please try again in a moment.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col justify-center px-5 py-16">
      <HostedForm formKey={formKey} schema={schema} />
    </div>
  );
}
