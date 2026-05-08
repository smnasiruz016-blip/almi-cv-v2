import { requireUser } from "@/lib/auth";
import { TemplatesListingClient } from "./templates-listing-client";
import type {
  RecipeMood,
  RecipeRole,
} from "@/components/templates/engine/recipe-types";

const VALID_ROLES = new Set<RecipeRole>([
  "healthcare",
  "trades",
  "customer-service-bpo",
  "hospitality-chef",
  "tech",
]);
const VALID_MOODS = new Set<RecipeMood>(["bold", "modern", "refined"]);

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; mood?: string; tier?: string }>;
}) {
  await requireUser();

  // Parse query params into the initial filter state. Anything we
  // don't recognise falls back to "all" — defensive against hand-edited
  // URLs and stale links.
  const sp = await searchParams;
  const role: "all" | RecipeRole = (() => {
    if (sp.role && VALID_ROLES.has(sp.role as RecipeRole)) {
      return sp.role as RecipeRole;
    }
    return "all";
  })();
  const mood: "all" | RecipeMood = (() => {
    if (sp.mood && VALID_MOODS.has(sp.mood as RecipeMood)) {
      return sp.mood as RecipeMood;
    }
    return "all";
  })();
  const tier: "all" | "free" | "premium" =
    sp.tier === "free" || sp.tier === "premium" ? sp.tier : "all";

  return <TemplatesListingClient initial={{ role, mood, tier }} />;
}
