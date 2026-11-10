import { Fragment } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Callout, H2, H3, Li, P, Ul } from "../prose";
import { DocsToc } from "../docs-toc";
import { WHY_UPDATED, whyDocSections, type WhyDocBlock } from "./why-doc-data";

function DocLinkCard({ label, href, text }: { label: string; href: string; text: string }) {
  const external = !href.startsWith("/");
  const className =
    "not-prose flex flex-col gap-1 rounded-xl border border-border bg-surface p-4 no-underline transition-colors hover:border-border-strong";
  const body = (
    <>
      <span className="flex items-center justify-between gap-2 text-[15px] font-semibold text-fg">
        {label}
        <ArrowUpRight className="h-4 w-4 text-fg-faint" aria-hidden="true" />
      </span>
      <span className="text-[13.5px] leading-snug text-fg-muted">{text}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  ) : (
    <Link href={href} className={className}>
      {body}
    </Link>
  );
}

function Block({ block }: { block: WhyDocBlock }) {
  switch (block.kind) {
    case "p":
      return <P>{block.text}</P>;
    case "h3":
      return <H3 id={block.id}>{block.text}</H3>;
    case "list":
      return (
        <Ul>
          {block.items.map((item) => (
            <Li key={item}>{item}</Li>
          ))}
        </Ul>
      );
    case "steps":
      return (
        <ol className="not-prose my-6 divide-y divide-border">
          {block.items.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-4 py-4 first:pt-0">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent/10 text-[13px] font-bold text-accent">
                {i + 1}
              </span>
              <div>
                <p className="text-[15.5px] font-semibold text-fg">{step.title}</p>
                <p className="mt-1 text-pretty text-[15px] leading-relaxed text-fg-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[520px] border-collapse text-[14.5px]">
            <thead>
              <tr className="bg-bg-subtle text-left text-[12.5px] font-semibold text-fg-muted">
                {block.head.map((cell) => (
                  <th key={cell} className="px-4 py-2.5">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([need, ours, theirs]) => (
                <tr key={need} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-fg">{need}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-fg">
                      <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {ours}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-fg-muted">{theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <Callout title={block.title} variant={block.tone}>
          {block.text}
        </Callout>
      );
    case "links":
      return (
        <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
          {block.items.map((item) => (
            <DocLinkCard key={item.label} {...item} />
          ))}
        </div>
      );
  }
}

export function WhyDoc() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 section-y">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article className="min-w-0">
          <p className="mb-6 text-[13px] text-fg-faint">{WHY_UPDATED}</p>
          <div className="prose-q max-w-3xl">
            {whyDocSections.map((section, i) => (
              <Fragment key={section.id}>
                <H2 id={section.id}>
                  {i + 1}. {section.title}
                </H2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </Fragment>
            ))}
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <DocsToc />
          </div>
        </aside>
      </div>
    </div>
  );
}
