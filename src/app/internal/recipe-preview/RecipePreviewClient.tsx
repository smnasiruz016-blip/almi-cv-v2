"use client";

import { useState } from "react";
import { renderRecipe } from "@/components/templates/engine";
import { RECIPE_LIST } from "@/lib/recipes";
import { PERSONAS } from "@/lib/personas";

export function RecipePreviewClient() {
  const [printSafe, setPrintSafe] = useState(false);
  const [paginated, setPaginated] = useState(false);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        color: "#111827",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E5E7EB",
          padding: "1rem 0",
          marginBottom: "1.5rem",
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 600, margin: 0 }}>
          Recipe preview · {RECIPE_LIST.length} recipe
          {RECIPE_LIST.length === 1 ? "" : "s"}
        </h1>
        <p
          style={{
            margin: "0.25rem 0 0.75rem 0",
            fontSize: "0.85rem",
            color: "#6B7280",
          }}
        >
          Internal-only route. Each recipe renders against its locked
          previewPersonaKey — the persona is part of the template's visual
          identity. Toggle print-safe to inspect Chromium print rendering;
          toggle paginated to run the same measure-and-pack pass the print
          route uses.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #D1D5DB",
              background: printSafe ? "#FEF3C7" : "#F9FAFB",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={printSafe}
              onChange={(e) => setPrintSafe(e.target.checked)}
            />
            printSafe
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              padding: "0.4rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #D1D5DB",
              background: paginated ? "#DBEAFE" : "#F9FAFB",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={paginated}
              onChange={(e) => setPaginated(e.target.checked)}
            />
            paginated
          </label>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {RECIPE_LIST.map((recipe) => {
          const persona = PERSONAS[recipe.previewPersonaKey];
          return (
            <section
              key={recipe.slug}
              style={{
                border: "1px solid #E5E7EB",
                borderRadius: "0.5rem",
                overflow: "hidden",
                background: "#FFFFFF",
              }}
            >
              <header
                style={{
                  padding: "0.75rem 1rem",
                  background: "#F3F4F6",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <h2
                  style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}
                >
                  {recipe.name}
                </h2>
                <p
                  style={{
                    margin: "0.125rem 0 0",
                    fontSize: "0.75rem",
                    color: "#6B7280",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  }}
                >
                  {recipe.slug} · {recipe.tier} · {recipe.role ?? "(no role)"}{" "}
                  · {recipe.mood ?? "(no mood)"} · v{recipe.version}
                </p>
                <p
                  style={{
                    margin: "0.25rem 0 0",
                    fontSize: "0.75rem",
                    color: "#374151",
                  }}
                >
                  Persona:{" "}
                  <span
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                    }}
                  >
                    {recipe.previewPersonaKey}
                  </span>{" "}
                  · {persona.basics.fullName}
                </p>
              </header>
              <div
                style={{
                  transform: "scale(0.65)",
                  transformOrigin: "top left",
                  width: "154%",
                  marginBottom: "-35%",
                }}
              >
                {renderRecipe(recipe, persona, {
                  paginated,
                  printSafe,
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
