// Mirrors the whitelisted projection `GET /api/public/forms/:formKey` returns
// on the backend — see FORMS.md. Kept separate from the dashboard's
// `shared/types` since this app has no access to that package.

export type PublicFormFieldType =
  | "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "radio" | "number";

export type PublicFormField = {
  key: string;
  label: string;
  type: PublicFormFieldType;
  required: boolean;
  options?: string[];
  maxLength: number;
};

export type PublicFormSettings = {
  submitText: string;
  successMessage: string;
  redirectUrl?: string;
  logoUrl?: string;
  primaryColor?: string;
  closedMessage: string;
};

export type PublicFormSchema = {
  name: string;
  status: "draft" | "published" | "closed";
  fields: PublicFormField[];
  settings: PublicFormSettings;
  timingToken: string;
  /** Free-plan forms carry "Powered by Quantalog" on the hosted page. */
  showBranding?: boolean;
};
