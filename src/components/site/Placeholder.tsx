import { ImageIcon } from "lucide-react";
import styles from "./ui.module.css";

/** A stand-in for a photo that is not picked yet. `search` is the Unsplash search from the Content Pack. */
export function Placeholder({ search, ratio = "4 / 3", className }: { search: string; ratio?: string; className?: string }) {
  return (
    <div role="img" aria-label={`Photo placeholder: ${search}`} className={[styles.placeholder, className].filter(Boolean).join(" ")} style={{ aspectRatio: ratio }} data-photo={search}>
      <span className={styles.placeholderLabel} aria-hidden="true">
        <ImageIcon size={16} strokeWidth={1.75} />
        {search}
      </span>
    </div>
  );
}
