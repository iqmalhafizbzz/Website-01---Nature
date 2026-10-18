import { ImageIcon } from "lucide-react";
import s from "./v2.module.css";

/** Rectangle stand-in for a photo; `search` is the Unsplash search from the Content Pack. */
export function Placeholder({ search, ratio = "16 / 9" }: { search: string; ratio?: string }) {
  return (
    <div role="img" aria-label={`Photo placeholder: ${search}`} className={s.ph} style={{ aspectRatio: ratio }} data-photo={search}>
      <span className={s.phLabel} aria-hidden="true"><ImageIcon size={14} strokeWidth={1.75} />{search}</span>
    </div>
  );
}
