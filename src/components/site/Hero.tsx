import type { ReactNode } from "react";
import s from "./site.module.css";

/** Titan's split hero: copy on the left, a visual on the right, a vertical rule between them. */
export function Hero({ top, title, text, actions, visual, facts }: { top?: ReactNode; title: string; text?: string; actions?: ReactNode; visual?: ReactNode; facts?: ReactNode }) {
  return (
    <section aria-labelledby="page-title">
      <div className={s.split}>
        <div className={top ? s.splitLeft : `${s.splitLeft} ${s.splitCenter}`}>
          {top}
          <div className={s.heroCopy}>
            <h1 id="page-title" className={s.hero}>{title}</h1>
            {text && <p className={s.body}>{text}</p>}
            {actions && <div className={s.actions}>{actions}</div>}
          </div>
        </div>
        <div className={s.splitRight}>{visual}</div>
      </div>
      {facts}
    </section>
  );
}
