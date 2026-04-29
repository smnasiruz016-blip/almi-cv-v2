"use client";

import {
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PaginatedSection = {
  key: string;
  node: ReactNode;
  column?: "left" | "right";
};

type PageShellProps = {
  pageIndex: number;
  pageCount: number;
  isFirstPage: boolean;
  children: ReactNode;
  leftChildren?: ReactNode;
  rightChildren?: ReactNode;
};

type PaginatedCVProps = {
  sections: PaginatedSection[];
  PageShell: (props: PageShellProps) => ReactNode;
  contentWidth: number;
  pageHeight: number;
  leftWidth?: number;
  rightWidth?: number;
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
  leftWidth = 400,
  rightWidth = 266,
}: PaginatedCVProps) {
  const measureRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [pages, setPages] = useState<PaginatedSection[][] | null>(null);

  const hasColumns = sections.some((s) => s.column);

  useLayoutEffect(() => {
    const heights: Record<string, number> = {};
    sections.forEach((s) => {
      const el = measureRefs.current[s.key];
      if (el) heights[s.key] = el.getBoundingClientRect().height;
    });

    const packed: PaginatedSection[][] = [[]];

    if (!hasColumns) {
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
    } else {
      let leftH = 0;
      let rightH = 0;
      for (const section of sections) {
        const h = heights[section.key] ?? 0;
        const isLeft = section.column !== "right";
        const projected = isLeft ? leftH + h : rightH + h;
        if (
          projected > pageHeight &&
          packed[packed.length - 1].length > 0
        ) {
          packed.push([]);
          leftH = 0;
          rightH = 0;
        }
        packed[packed.length - 1].push(section);
        if (isLeft) leftH += h;
        else rightH += h;
      }
    }

    setPages((current) => {
      if (current && pagesEqual(current, packed)) return current;
      return packed;
    });
  }, [sections, contentWidth, pageHeight, hasColumns, leftWidth, rightWidth]);

  return (
    <>
      {!hasColumns ? (
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
          {sections.map((s) => (
            <div
              key={s.key}
              ref={(el) => {
                measureRefs.current[s.key] = el;
              }}
            >
              {s.node}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            aria-hidden
            style={{
              position: "fixed",
              top: -99999,
              left: 0,
              width: leftWidth,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {sections
              .filter((s) => s.column !== "right")
              .map((s) => (
                <div
                  key={s.key}
                  ref={(el) => {
                    measureRefs.current[s.key] = el;
                  }}
                >
                  {s.node}
                </div>
              ))}
          </div>
          <div
            aria-hidden
            style={{
              position: "fixed",
              top: -99999,
              left: leftWidth + 100,
              width: rightWidth,
              opacity: 0,
              pointerEvents: "none",
            }}
          >
            {sections
              .filter((s) => s.column === "right")
              .map((s) => (
                <div
                  key={s.key}
                  ref={(el) => {
                    measureRefs.current[s.key] = el;
                  }}
                >
                  {s.node}
                </div>
              ))}
          </div>
        </>
      )}

      {pages === null ? (
        <PageShell
          pageIndex={0}
          pageCount={1}
          isFirstPage
          leftChildren={
            hasColumns
              ? sections
                  .filter((s) => s.column !== "right")
                  .map((s) => <Fragment key={s.key}>{s.node}</Fragment>)
              : undefined
          }
          rightChildren={
            hasColumns
              ? sections
                  .filter((s) => s.column === "right")
                  .map((s) => <Fragment key={s.key}>{s.node}</Fragment>)
              : undefined
          }
        >
          {!hasColumns &&
            sections.map((s) => <Fragment key={s.key}>{s.node}</Fragment>)}
        </PageShell>
      ) : (
        pages.map((sectionsForPage, pageIdx) => {
          const leftForPage = sectionsForPage.filter(
            (s) => s.column !== "right",
          );
          const rightForPage = sectionsForPage.filter(
            (s) => s.column === "right",
          );
          return (
            <Fragment key={pageIdx}>
              <PageShell
                pageIndex={pageIdx}
                pageCount={pages.length}
                isFirstPage={pageIdx === 0}
                leftChildren={
                  hasColumns
                    ? leftForPage.map((s) => (
                        <Fragment key={s.key}>{s.node}</Fragment>
                      ))
                    : undefined
                }
                rightChildren={
                  hasColumns
                    ? rightForPage.map((s) => (
                        <Fragment key={s.key}>{s.node}</Fragment>
                      ))
                    : undefined
                }
              >
                {!hasColumns &&
                  sectionsForPage.map((s) => (
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
          );
        })
      )}
    </>
  );
}
