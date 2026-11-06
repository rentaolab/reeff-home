/**
 * Visible FAQ list.
 *
 * The same `items` array also feeds the `FAQPage` JSON-LD in the homepage, so the
 * structured data can never list a question the reader cannot see. Built on
 * <details> so it works without JavaScript and stays readable on a phone.
 */
export default function Faq({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: { q: string; a: string }[];
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6">
      <h2 className="text-2xl font-black tracking-tight text-white">{heading}</h2>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">{intro}</p>
      <div className="mt-6 space-y-2">
        {items.map((item) => (
          <details key={item.q} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <summary className="cursor-pointer list-none text-sm font-bold text-white marker:content-none [&::-webkit-details-marker]:hidden">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
