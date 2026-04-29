"use client";

import {
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PaginatedSection = { key: string; node: ReactNode };

type PaginatedCVProps = {
  sections: PaginatedSection[];
  PageShell: (props: {
    pageIndex: number;
    pageCount: number;
    isFirstPage: boolean;
    children: ReactNode;
  }) => ReactNode;
  contentWidth: number;
  pageHeight: number;
};

function pagesEqual(
  a: PaginatedSection[][],
  b: PaginatedSection[][],
): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].length !== b[i].length) return false;
    for (let j = 0; j < a[i].length; j++) {
      if (a[i][j].key !== b[i][j].key) return false;
    }
  }
  return true;
}

export function PaginatedCV({
  sections,
  PageShell,
  contentWidth,
  pageHeight,
}: PaginatedCVProps) {
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pages, setPages] = useState<PaginatedSection[][] | null>(null);

  useLayoutEffect(() => {
    const heights: Record<string, number> = {};
    sections.forEach((s, idx) => {
      const el = measureRefs.current[idx];
      if (el) heights[s.key] = el.getBoundingClientRect().height;
    });

    const packed: PaginatedSection[][] = [[]];
    let currentHeight = 0;
    for (const section of sections) {
      const h = heights[section.key] ?? 0;
      if (
        currentHeight + h > pageHeight &&
        packed[packed.length - 1].length > 0
      ) {
        packed.push([]);
        currentHeight = 0;
      }
      packed[packed.length - 1].push(section);
      currentHeight += h;
    }

    setPages((current) => {
      if (current && pagesEqual(current, packed)) return current;
      return packed;
    });
  }, [sections, contentWidth, pageHeight]);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: -99999,
          left: 0,
          width: contentWidth,
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        {sections.map((s, idx) => (
          <div
            key={s.key}
            ref={(el) => {
              measureRefs.current[idx] = el;
            }}
          >
            {s.node}
          </div>
        ))}
      </div>

      {pages === null ? (
        <PageShell pageIndex={0} pageCount={1} isFirstPage>
          {sections.map((s) => (
            <Fragment key={s.key}>{s.node}</Fragment>
          ))}
        </PageShell>
      ) : (
        pages.map((sectionsForPage, pageIdx) => (
          <Fragment key={pageIdx}>
            <PageShell
              pageIndex={pageIdx}
              pageCount={pages.length}
              isFirstPage={pageIdx === 0}
            >
              {sectionsForPage.map((s) => (
                <Fragment key={s.key}>{s.node}</Fragment>
              ))}
            </PageShell>
            {pageIdx < pages.length - 1 && (
              <div className="print-hide mx-auto my-6 flex max-w-[800px] items-center gap-3">
                <hr className="flex-1 border-plum/15" />
                <span className="text-xs uppercase tracking-widest text-plum-soft">
                  Page {pageIdx + 2}
                </span>
                <hr className="flex-1 border-plum/15" />
              </div>
            )}
          </Fragment>
        ))
      )}
    </>
  );
}
