import type { CVData } from "@/lib/cv-types";
import type { TemplateMeta } from "@/lib/templates";
import { mayaRodriguez } from "@/lib/sample-cv-data";

export function TemplateThumbnail({
  template,
  data,
  scale = 0.35,
}: {
  template: TemplateMeta;
  data?: CVData;
  scale?: number;
}) {
  const Component = template.Component;
  const renderData = data ?? template.sampleData ?? mayaRodriguez;

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
        <Component data={renderData} paginated={false} />
      </div>
    </div>
  );
}
