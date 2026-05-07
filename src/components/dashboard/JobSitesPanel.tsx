import { ExternalLink } from "lucide-react";
import type { JobSite } from "@/lib/job-sites";

function titleCase(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function badgeLabel(site: JobSite, country: string): string {
  if (site.category === "government") return "Government";
  if (
    site.country &&
    site.country !== "Worldwide" &&
    site.country === country
  ) {
    return `${country} local`;
  }
  if (!site.country || site.country === "Worldwide" || site.category === "general") {
    return "Global";
  }
  return titleCase(site.category);
}

export function JobSitesPanel({
  sites,
  country,
}: {
  sites: JobSite[];
  country: string | undefined;
}) {
  if (!country || sites.length === 0) return null;

  return (
    <section className="rounded-2xl border border-peach/40 bg-white p-8 shadow-warm-card">
      <div>
        <h2 className="text-2xl text-plum">Find jobs in {country}</h2>
        <p className="mt-2 text-sm text-plum-soft">
          Hand-picked job sites for {country}, curated by AlmiJob.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <a
            key={`${site.name}-${site.url}`}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col rounded-xl border border-peach/40 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-coral-soft hover:shadow-md"
          >
            <ExternalLink
              aria-hidden="true"
              className="absolute right-4 top-4 h-4 w-4 text-plum-soft transition-colors group-hover:text-coral"
            />
            <h3 className="pr-6 text-base font-semibold text-plum">
              {site.name}
            </h3>
            <span className="mt-2 inline-flex w-fit items-center rounded-full bg-coral-soft/40 px-2 py-0.5 text-xs font-medium text-plum">
              {badgeLabel(site, country)}
            </span>
            {site.note && (
              <p className="mt-3 line-clamp-1 text-sm text-plum-soft">
                {site.note}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
