// One step in the install guide. Server component — no client deps.
//
// Anatomy (top → bottom):
//   1. Numbered eyebrow ("Step 03 of 11")
//   2. Step title in serif sans-italic for editorial weight
//   3. Body paragraphs (children)
//   4. Optional visual (image OR inline SVG mockup)
//   5. Optional "What if..." troubleshooting callout
//
// Layout: on md+ the visual sits to the right (60/40 split). On mobile
// everything stacks vertically — visual after the body so the reader
// gets the action description first, screenshot second.

import type { ReactNode } from "react";
import { GuideImage } from "./GuideImage";

type Visual =
  | { kind: "image"; src: string; alt: string }
  | { kind: "mockup"; node: ReactNode };

export type Branch = {
  title: string;
  body: ReactNode;
};

type Props = {
  index: number;
  total: number;
  title: string;
  children: ReactNode;
  visual?: Visual;
  reassurance?: ReactNode;
  branch?: Branch;
};

export function StepBlock({ index, total, title, children, visual, reassurance, branch }: Props) {
  const stepLabel = `Step ${String(index).padStart(2, "0")} of ${String(total).padStart(2, "0")}`;

  return (
    <article className="grid gap-8 border-l border-rule pl-6 md:grid-cols-[1fr_minmax(0,1fr)] md:gap-10 md:pl-10">
      <div>
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-faint">{stepLabel}</p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-ink md:text-2xl">{title}</h3>
        <div className="mt-4 grid gap-3 text-[15px] leading-relaxed text-muted">
          {children}
        </div>

        {reassurance ? (
          <div className="mt-5 rounded-md border-l-2 border-accent/70 bg-accent/[0.05] px-4 py-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">
              You will see this — it is normal
            </p>
            <p className="mt-1 text-sm text-muted">{reassurance}</p>
          </div>
        ) : null}

        {branch ? (
          <div className="mt-5 rounded-md border border-rule bg-surface/40 px-4 py-3">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-faint">
              If instead — {branch.title}
            </p>
            <div className="mt-2 text-sm text-muted">{branch.body}</div>
          </div>
        ) : null}
      </div>

      {visual ? (
        <figure className="md:sticky md:top-24">
          {visual.kind === "image" ? (
            <div className="screenshot-frame relative overflow-hidden rounded-lg border border-rule bg-paper">
              {/* Placeholder shows through until the screenshot paints over it.
                  GuideImage removes itself on a 404 (asset captured post-launch),
                  so the placeholder stays visible rather than a broken glyph. */}
              <div className="flex aspect-video items-center justify-center px-6 text-center text-[0.66rem] font-mono uppercase tracking-[0.16em] text-faint">
                screenshot pending capture — {visual.alt}
              </div>
              <GuideImage src={visual.src} alt={visual.alt} />
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-rule bg-paper p-4">
              {visual.node}
            </div>
          )}
          {visual.kind === "image" ? (
            <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-faint">
              {visual.alt}
            </figcaption>
          ) : null}
        </figure>
      ) : null}
    </article>
  );
}
