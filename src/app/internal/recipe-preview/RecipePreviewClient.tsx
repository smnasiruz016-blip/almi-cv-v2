"use client";

import { useState } from "react";
import { renderRecipe } from "@/components/templates/engine";
import { RECIPE_LIST } from "@/lib/recipes";
import { PERSONAS, type PersonaId } from "@/lib/personas";

const PERSONA_IDS = Object.keys(PERSONAS) as PersonaId[];

export function RecipePreviewClient() {
  const [printSafe, setPrintSafe] = useState(false);
  const [paginated, setPaginated] = useState(false);
  const [singlePersona, setSinglePersona] = useState<"all" | PersonaId>(
    "all",
  );

  const visiblePersonaIds: PersonaId[] =
    singlePersona === "all" ? PERSONA_IDS : [singlePersona];

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
          Recipe preview · {RECIPE_LIST.length} recipes ×{" "}
          {visiblePersonaIds.length} persona
          {visiblePersonaIds.length === 1 ? "" : "s"}
        </h1>
        <p
          style={{
            margin: "0.25rem 0 0.75rem 0",
            fontSize: "0.85rem",
            color: "#6B7280",
          }}
        >
          Internal-only route. Toggle print-safe to inspect how the
          Chromium print pipeline will render decorators, blends, and
          tints. Toggle paginated to run the same measure-and-pack pass
          the print route uses.
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
          <select
            value={singlePersona}
            onChange={(e) =>
              setSinglePersona(e.target.value as "all" | PersonaId)
            }
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid #D1D5DB",
              fontSize: "0.875rem",
              background: "#F9FAFB",
            }}
          >
            <option value="all">All personas</option>
            {PERSONA_IDS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
      </header>

      {RECIPE_LIST.map((recipe) => (
        <section
          key={recipe.slug}
          style={{
            marginBottom: "3rem",
            paddingTop: "1.25rem",
            borderTop: "2px solid #E5E7EB",
          }}
        >
          <h2 style={{ fontSize: "1.125rem", margin: "0 0 0.25rem 0" }}>
            {recipe.name} · {recipe.slug}
          </h2>
          <p
            style={{
              margin: "0 0 1rem 0",
              fontSize: "0.8rem",
              color: "#6B7280",
            }}
          >
            {recipe.tier} · {recipe.role ?? "(no role)"} ·{" "}
            {recipe.mood ?? "(no mood)"} · v{recipe.version}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {visiblePersonaIds.map((personaId) => {
              const persona = PERSONAS[personaId];
              return (
                <div
                  key={personaId}
                  style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    background: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      padding: "0.5rem 0.75rem",
                      background: "#F3F4F6",
                      fontSize: "0.75rem",
                      color: "#374151",
                      borderBottom: "1px solid #E5E7EB",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                    }}
                  >
                    persona: {personaId} · {persona.basics.fullName}
                  </div>
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
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
