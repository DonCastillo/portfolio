import { existsSync } from "node:fs";
import path from "node:path";

/** Whether a public path like "/projects/gac-paq/01.webp" exists in public/. Build time only. */
export function imageExists(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", src));
}
