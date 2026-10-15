import { Cookie, RefreshCw, ShieldCheck } from "lucide-react";

const facts = [
  {
    icon: Cookie,
    title: "Zero cookies.",
    body: "No cookies, no localStorage and no persistent ID. The only thing kept is a session ID that is cleared when the tab closes.",
  },
  {
    icon: RefreshCw,
    title: "A hash that forgets.",
    body: "Visitors are a salted hash of IP and user agent that rotates every week, so nobody can be followed from one week to the next.",
  },
  {
    icon: ShieldCheck,
    title: "No names or IPs.",
    body: "Analytics keeps no names, emails or IP addresses, so there is no identity to leak or export.",
  },
];

export function ConsentFacts() {
  return (
    <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
      {facts.map((f) => (
        <li key={f.title} className="text-center sm:text-left">
          <f.icon className="mx-auto h-7 w-7 text-accent sm:mx-0" strokeWidth={1.6} aria-hidden="true" />
          <p className="mt-4 text-[1.1875rem] font-semibold tracking-tight text-fg">{f.title}</p>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
