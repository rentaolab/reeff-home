import type { Block } from "@/content/types";

/**
 * Renders the structured `Block[]` content model.
 *
 * Everything here mirrors the dark palette used by the rest of the site, but the
 * type scale is a notch larger than the legal pages: these are pages people are
 * meant to read, not skim.
 */
export default function GuideBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="mt-8 space-y-5">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p className="text-sm leading-relaxed text-slate-300">{block.text}</p>;

    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-24 pt-6 text-xl font-bold tracking-tight text-white"
        >
          {block.text}
        </h2>
      );

    case "h3":
      return <h3 className="pt-2 text-sm font-bold text-white">{block.text}</h3>;

    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );

    case "steps":
      return (
        <ol className="space-y-4">
          {block.items.map((item, index) => (
            <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-baseline gap-2 text-sm font-bold text-white">
                <span className="text-[11px] font-black text-red-400">{String(index + 1).padStart(2, "0")}</span>
                {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.text}</p>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <figure className="space-y-2">
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[34rem] border-collapse text-left text-xs">
              <thead>
                <tr className="bg-white/[0.04]">
                  {block.head.map((cell) => (
                    <th key={cell} className="px-4 py-3 font-bold text-white">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-white/10 align-top">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-3 leading-relaxed ${cellIndex === 0 ? "font-semibold text-slate-200" : "text-slate-400"}`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="text-[11px] text-slate-500">{block.caption}</figcaption>}
        </figure>
      );

    case "figure":
      return (
        <figure className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            decoding="async"
            className="w-full rounded-2xl border border-white/10"
          />
          {block.caption && <figcaption className="text-[11px] text-slate-500">{block.caption}</figcaption>}
        </figure>
      );

    case "callout":
      return (
        <aside
          className={`rounded-2xl border p-4 ${
            block.tone === "warn" ? "border-amber-500/30 bg-amber-500/[0.06]" : "border-white/10 bg-white/[0.03]"
          }`}
        >
          {block.title && (
            <p className={`text-xs font-bold ${block.tone === "warn" ? "text-amber-200" : "text-white"}`}>{block.title}</p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{block.text}</p>
        </aside>
      );

    case "quote":
      return (
        <blockquote className="border-l-2 border-red-500/40 pl-4 text-sm italic leading-relaxed text-slate-400">
          {block.text}
          {block.cite && <footer className="mt-2 text-[11px] not-italic text-slate-500">{block.cite}</footer>}
        </blockquote>
      );
  }
}
