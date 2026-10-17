import type { ReactNode } from "react";
import styles from "./ui.module.css";

type Tone = "plain" | "tinted" | "wash";

/** One page section: vertical rhythm plus the shared container. */
export function Section({ id, tone = "plain", labelledBy, className, children }: { id?: string; tone?: Tone; labelledBy?: string; className?: string; children: ReactNode }) {
  const toneClass = tone === "tinted" ? styles.tinted : tone === "wash" ? styles.wash : undefined;
  return (
    <section id={id} aria-labelledby={labelledBy} className={[styles.section, toneClass, className].filter(Boolean).join(" ")}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}

export function SectionHead({ id, title, lead }: { id: string; title: string; lead?: string }) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.heading}>{title}</h2>
      {lead && <p className={styles.lead}>{lead}</p>}
    </div>
  );
}

/** Copy beside a visual; `reverse` puts the visual first on wide screens. */
export function Split({ copy, visual, reverse = false }: { copy: ReactNode; visual: ReactNode; reverse?: boolean }) {
  return (
    <div className={[styles.split, reverse ? styles.splitReverse : undefined].filter(Boolean).join(" ")}>
      <div className={styles.splitCopy}>{copy}</div>
      <div>{visual}</div>
    </div>
  );
}

export { styles as ui };
