import s from "./site.module.css";

/** A plain grey rectangle in place of a photo; `search` is the Unsplash search from the Content Pack. */
export function Placeholder({ search, ratio, fill = false }: { search: string; ratio?: string; fill?: boolean }) {
  return (
    <div role="img" aria-label={`Photo placeholder: ${search}`} className={[s.ph, fill ? s.phFill : undefined].filter(Boolean).join(" ")} style={ratio ? { aspectRatio: ratio } : undefined} data-photo={search}>
      <span className={s.phLabel} aria-hidden="true">{search}</span>
    </div>
  );
}
