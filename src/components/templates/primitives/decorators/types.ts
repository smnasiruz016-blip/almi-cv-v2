/**
 * Shared types for decorator primitives.
 *
 * All decorators take a `printSafe` flag that flattens visuals which
 * Chromium's print pipeline renders unreliably (gradients, complex SVG
 * paths, repeating patterns at low opacity). Templates rendered into the
 * Puppeteer print route pass printSafe=true; on-screen previews pass
 * false (or omit it). See render-recipe.ts for the wiring.
 */
export type PrintSafeProp = {
  printSafe?: boolean;
};
