import { Keyboard, Lock, Move, Pin, Save, Search } from "lucide-react";
import type { AppPage } from "./types";

export const notesApp: AppPage = {
  slug: "notes",
  logo: "quantalog-notes.svg",
  name: "Quantalog Notes",
  shortName: "Notes",
  group: "Work",
  unlock: "once",
  docs: "/docs/quantalog-notes",
  launched: "2026-10-30",
  title: "A notepad that floats",
  accent: "over every page.",
  description:
    "Jot down ideas, to-dos and findings without leaving the report you're reading. Press N on any page, and your notes are there.",
  metaDescription:
    "Private notes that float over any page of your analytics workspace. Press N to open, drag anywhere, pin what matters, and search from the command menu.",
  keywords: ["notes in analytics", "floating notes", "private notes app", "keyboard shortcut notes", "marketing notes"],
  chips: [
    { icon: Keyboard, label: "Press N" },
    { icon: Pin, label: "Pinned to the top" },
    { icon: Lock, label: "Only you can see them" },
  ],
  stats: [
    { value: "1", label: "Key to open them" },
    { value: "0", label: "Teammates who can read them" },
    { value: "∞", label: "Pages they float over" },
  ],
  features: [
    {
      icon: Keyboard,
      title: "One key away",
      body: "Press N on any page when you're not typing in a field. Or open them from the account menu or Ctrl K.",
    },
    {
      icon: Move,
      title: "Put it anywhere",
      body: "Drag the panel wherever it's out of the way. Double-click its handle to put it back.",
    },
    {
      icon: Save,
      title: "Saves as you type",
      body: "There's no save button. Close the panel mid-sentence and it's still there.",
    },
    {
      icon: Pin,
      title: "Pin what matters",
      body: "Keep the notes you come back to at the top of the list.",
    },
    {
      icon: Search,
      title: "Find any note",
      body: "Type part of a note in the command menu to jump straight to it.",
    },
    {
      icon: Lock,
      title: "Yours alone",
      body: "Notes belong to you, not the workspace. Teammates never see them, and they follow you into every workspace with Notes on.",
    },
  ],
  steps: [
    {
      title: "Unlock Notes",
      body: "A workspace admin unlocks Quantalog Notes once in Apps. It's on for everyone in the workspace straight away.",
    },
    {
      title: "Press N",
      body: "On any page, press N to open the panel. Drag it out of the way of what you're reading.",
    },
    {
      title: "Write, pin, find",
      body: "Type as you go, pin the notes you need often, and find any note from Ctrl K.",
    },
  ],
  story: {
    eyebrow: "Why it's here",
    title: "The thought happens while you're looking at the chart.",
    paragraphs: [
      "Switching to another app to write down what you just noticed is how notes don't get written. Notes opens over the page you're on, so the finding and the note happen together.",
      "Turning Notes off hides it for the workspace but deletes nothing. Turn it back on and every note is where you left it.",
    ],
  },
  connections: [
    { kind: "app", id: "tasks", how: "When a note turns into work for the team, put it on the board." },
    { kind: "product", href: "/analytics", how: "Open notes over any report without losing your place." },
    { kind: "app", id: "insights", how: "Jot down what you make of this week's changes as you read them." },
  ],
  included: [
    "Press N on any page",
    "Open from the account menu or Ctrl K",
    "Drag the panel anywhere",
    "Saves as you type",
    "Pin notes to the top",
    "Search notes from the command menu",
    "Private to you",
    "Same notes in every workspace with Notes on",
  ],
  faqs: [
    {
      q: "Can my team see my notes?",
      a: "No. Notes belong to you, not the workspace. Teammates never see them.",
    },
    {
      q: "What happens if Notes is turned off?",
      a: "It's hidden for everyone in that workspace, but nothing is deleted. Turn it back on and every note is still there.",
    },
    {
      q: "Does N work while I'm typing?",
      a: "No. The shortcut only opens Notes when you aren't typing in a field.",
    },
  ],
  related: ["tasks", "links", "media"],
  ctaTitle: "Write it down without leaving the page.",
};
