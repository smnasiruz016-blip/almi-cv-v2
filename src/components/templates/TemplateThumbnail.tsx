import type { CVData } from "@/lib/cv-types";
import type { TemplateMeta } from "@/lib/templates";

// Renders the template Component at small scale for dashboard cards.
// Now that TemplateMeta.sampleData was removed in PR #53, callers must
// pass `data` — there is no sample-CV fallback baked into this file.
// The dashboard always has the user's real CVData in hand, so this
// contract is straightforward.
export function TemplateThumbnail({
  template,
  data,
  scale = 0.35,
}: {
  template: TemplateMeta;
  data: CVData;
  scale?: number;
}) {
  const Component = template.Component;

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-white"
      style={{ aspectRatio: "1 / 1.414" }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0"
        style={{
          width: 794,
          height: 1123,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Component data={data} paginated={false} />
      </div>
    </div>
  );
}
