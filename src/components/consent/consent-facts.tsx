import { Cookie, RefreshCw, ShieldCheck } from "lucide-react";

const facts = [
  {
    icon: Cookie,
    title: "Zero cookies.",
    body: "Nothing is written to the browser — not a cookie, not localStorage — so there is nothing to consent to.",
  },
  {
    icon: RefreshCw,
    title: "A hash that forgets.",
    body: "Visitors are a salted hash of IP and user agent that rotates every day, so nobody is recognisable tomorrow.",
  },
  {
    icon: ShieldCheck,
    title: "No personal data.",
    body: "Nothing personal is stored, so there is nothing to leak, export or delete on request.",
  },
];

export function ConsentFacts() {
  return (
    <ul className="grid gap-10 sm:grid-cols-3 sm:gap-8">
      {facts.map((f, i) => (
        <li key={f.title} className={`v-rise v-d${i + 1} text-center sm:text-left`}>
          <f.icon className="mx-auto h-7 w-7 text-accent sm:mx-0" strokeWidth={1.6} aria-hidden="true" />
          <p className="mt-4 text-[1.1875rem] font-semibold tracking-tight text-fg">{f.title}</p>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-fg-muted">{f.body}</p>
        </li>
      ))}
    </ul>
  );
}
