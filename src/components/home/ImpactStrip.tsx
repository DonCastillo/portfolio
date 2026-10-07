import { impact } from "@/data/site";

/** Four headline numbers under the hero: 2 columns on mobile, 4 on desktop. */
export function ImpactStrip() {
  return (
    <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:mt-20 md:grid-cols-4">
      {impact.map(({ value, label }) => (
        <div key={value} className="flex flex-col-reverse gap-2">
          <dt className="text-sm leading-snug text-muted">{label}</dt>
          <dd className="font-mono text-[1.75rem] leading-none font-semibold tracking-tight text-accent md:text-4xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
