import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui";

export function ProductSection({
  id,
  eyebrow,
  title,
  body,
  link,
  bordered = false,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  body?: string;
  link?: { label: string; href: string };
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={bordered ? "border-t border-border" : undefined}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
        <SectionHeading eyebrow={eyebrow} title={title} body={body} centered />
        <div className="mt-10 sm:mt-16">{children}</div>
        {link && (
          <div className="mt-10 text-center">
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4"
            >
              {link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
