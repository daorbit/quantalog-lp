import { CheckSquare, Eye, Filter, FolderOpen, Search, Upload } from "lucide-react";
import type { AppPage } from "./types";

export const mediaApp: AppPage = {
  slug: "media",
  logo: "quantalog-media.svg",
  name: "Quantalog Media",
  shortName: "Media",
  group: "Work",
  unlock: "free",
  docs: "/docs/media-library",
  launched: "2026-10-30",
  title: "One library for",
  accent: "every file you use.",
  description:
    "Every image, video and document you upload lives in one place, whether you add it here or pick it from a post, a form or your branding.",
  metaDescription:
    "A media library for your workspace. Upload by drag and drop, search and filter, preview inline, and reuse files across posts, forms and branding.",
  keywords: ["media library", "file manager", "image library for marketing", "asset library", "upload manager"],
  chips: [
    { icon: Upload, label: "Drop files anywhere" },
    { icon: Filter, label: "Images, Video, Files" },
    { icon: Eye, label: "Preview inline" },
  ],
  stats: [
    { value: "25", unit: "MB", label: "Per file" },
    { value: "40", label: "Files per page" },
    { value: "1", label: "Library for everything" },
  ],
  features: [
    {
      icon: Upload,
      title: "Drag and drop",
      body: "Drop a file anywhere on the page or use Upload. A tray shows each file as uploading, done or failed.",
    },
    {
      icon: Search,
      title: "Search by name",
      body: "Find a file by its name in a library of hundreds.",
    },
    {
      icon: Filter,
      title: "Filter by kind",
      body: "All, Images, Video or Files, so you only see what you're looking for.",
    },
    {
      icon: Eye,
      title: "Preview inline",
      body: "Images, video, PDFs, common Office documents and small text files open right in the library. Rename or delete from there.",
    },
    {
      icon: CheckSquare,
      title: "Select many",
      body: "Tick several files and delete them at once when a campaign is over.",
    },
    {
      icon: FolderOpen,
      title: "Shared everywhere",
      body: "Posts, forms and branding pick from the same library, so the logo you uploaded once is there every time.",
    },
  ],
  steps: [
    {
      title: "Turn Media on",
      body: "A workspace admin enables Quantalog Media in Apps. Media appears in the sidebar.",
    },
    {
      title: "Upload your files",
      body: "Drag files onto the page or press Upload. Each file can be up to 25MB.",
    },
    {
      title: "Use them anywhere",
      body: "Pick files from the library when you write a post, build a form or set your branding.",
    },
  ],
  story: {
    eyebrow: "Always available",
    title: "The library page is the app. Uploads always work.",
    paragraphs: [
      "Quantalog Media turns on the library page. Even while it's off, posts, branding and forms can still pick and upload images as before.",
      "Deleting a file breaks any place that still links to it, such as a form field or a branding logo, so check before you clear a folder out.",
    ],
  },
  connections: [
    { kind: "app", id: "instagram", how: "Pick images for scheduled posts straight from the library." },
    { kind: "product", href: "/forms", how: "Form images and backgrounds come from the same files." },
    { kind: "app", id: "bio", how: "Your bio page photo is picked from the library." },
    { kind: "app", id: "links", how: "Upload a custom logo for a sidebar link." },
  ],
  included: [
    "Drag-and-drop upload",
    "Upload tray with progress",
    "Files up to 25MB",
    "Search by file name",
    "Filter by images, video or files",
    "Inline preview, rename and delete",
    "Multi-select delete",
    "Shared with posts, forms and branding",
  ],
  faqs: [
    {
      q: "Do I need Media turned on to upload images to a post?",
      a: "No. Posts, branding and forms can always pick and upload images. The app only adds the library page.",
    },
    {
      q: "Does deleting a file remove it everywhere?",
      a: "Yes, and any place that still links to it will break. Quantalog doesn't scan for those references first.",
    },
  ],
  related: ["link-in-bio", "notes", "links"],
  ctaTitle: "Keep every file in one place.",
};
