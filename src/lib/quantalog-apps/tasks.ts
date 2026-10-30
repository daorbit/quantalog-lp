import { CalendarDays, ChartGantt, Columns3, ListTree, Lock, UserPlus } from "lucide-react";
import type { AppPage } from "./types";

export const tasksApp: AppPage = {
  slug: "tasks",
  logo: "quantalog-tasks.svg",
  name: "Quantalog Tasks",
  shortName: "Tasks",
  group: "Work",
  unlock: "once",
  docs: "/docs/quantalog-tasks",
  launched: "2026-10-30",
  title: "One board for",
  accent: "what happens next.",
  description:
    "A shared board for the team's work, with owners, due dates, subtasks and dependencies, and Board, Calendar, Timeline and My work views of the same tasks.",
  metaDescription:
    "A team task board inside your analytics workspace. Buckets, subtasks, dependencies, start and due dates, calendar and timeline views, and a weekly recap.",
  keywords: ["team task board", "kanban board", "task management for marketing", "planner alternative", "project timeline"],
  chips: [
    { icon: Columns3, label: "Board, Calendar, Timeline" },
    { icon: ListTree, label: "Subtasks 2 / 5" },
    { icon: Lock, label: "Blocked by T-4" },
  ],
  stats: [
    { value: "6", label: "Ways to see the work" },
    { value: "20", label: "Buckets per board" },
    { value: "5,000", label: "Open tasks on Pro" },
  ],
  features: [
    {
      icon: Columns3,
      title: "A board that fits",
      body: "Six buckets to start, rename or add your own, and group by progress, person or priority. Drag a card to change it.",
    },
    {
      icon: ListTree,
      title: "Subtasks",
      body: "Split a task into subtasks with their own owner and dates, or turn a checklist item into one. The card shows how many are done.",
    },
    {
      icon: Lock,
      title: "Dependencies",
      body: "Mark what must finish first. Blocked cards say so, and the timeline draws the arrow between them.",
    },
    {
      icon: CalendarDays,
      title: "Calendar",
      body: "Every task on its due date. Drag it to another day and its start date moves with it.",
    },
    {
      icon: ChartGantt,
      title: "Timeline",
      body: "Bars from start to due date, grouped by bucket, with a today line and arrows between linked tasks.",
    },
    {
      icon: UserPlus,
      title: "My work",
      body: "Your open tasks grouped into overdue, today, next 7 days and later, with your weekly streak on top.",
    },
  ],
  steps: [
    {
      title: "Unlock Tasks",
      body: "A workspace admin unlocks Quantalog Tasks once in Apps. The board appears for everyone in the workspace.",
    },
    {
      title: "Add the work",
      body: "Press Add task or type into any column. Assign people, set start and due dates, add subtasks and links.",
    },
    {
      title: "Pick your view",
      body: "Run the week on the Board, plan on the Calendar or Timeline, and start each day from My work.",
    },
  ],
  story: {
    eyebrow: "Why inside Quantalog",
    title: "The task lives next to the reason for it.",
    paragraphs: [
      "A traffic drop, a slipping page, a review that needs a reply: the work starts in your data. Insights and SEO findings become tasks in one click, with a link back to what prompted them.",
      "Everyone assigned hears about it in the bell straight away, and the weekly recap shows what the team shipped, the longest streak and who finished the most.",
    ],
  },
  connections: [
    { kind: "app", id: "insights", how: "Create task on any weekly insight, with a link back to the filtered data." },
    { kind: "app", id: "compare", how: "Turn a competitor gap into a task for whoever owns that page." },
    { kind: "product", href: "/forms", how: "Link a task to the lead or form it's about with a Quantalog page link." },
    { kind: "app", id: "alerts", how: "When an alert fires, put the fix on the board with a due date." },
  ],
  included: [
    "Buckets you can rename, add and limit",
    "Group by progress, person or priority",
    "Subtasks and checklists",
    "Blocked by and blocks links",
    "Start and due dates",
    "Board, Grid, Calendar, Timeline, My work and Charts",
    "Labels, priorities and notes",
    "Bell notice when someone is assigned",
  ],
  plans: [{ row: "Open tasks", free: "50", starter: "500", pro: "5,000" }],
  faqs: [
    {
      q: "Do finished tasks count toward the limit?",
      a: "No. Only open tasks count. Completed tasks fold away under each bucket and stay visible for 30 days.",
    },
    {
      q: "Can a subtask have its own subtasks?",
      a: "No. Subtasks go one level deep, which keeps the board readable.",
    },
    {
      q: "Who can change the board?",
      a: "Editors, admins and owners can add, move and delete tasks. Viewers can see the board but not change it.",
    },
    {
      q: "Can I limit how much sits in one column?",
      a: "Yes. Set a limit on any bucket. Its count turns amber at the limit and red when it goes over.",
    },
  ],
  related: ["insights", "notes", "compare"],
  ctaTitle: "Put the team's week on one board.",
};
