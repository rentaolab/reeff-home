import GuideBody from "@/components/GuideBody";
import type { HomeSection } from "@/content/home";

/**
 * The long-form homepage sections ("What people use it for", "How it works",
 * "What Reeff is not"). Blocks are reused from the guide renderer so the site
 * has one typographic system instead of two.
 */
export default function HomeSections({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10 sm:px-6">
          <h2 className="text-2xl font-black tracking-tight text-white">{section.heading}</h2>
          <GuideBody blocks={section.blocks} />
        </section>
      ))}
    </>
  );
}
