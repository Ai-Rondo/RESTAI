import { cp, mkdir, rm } from "node:fs/promises";

await rm(".vercel/output/static", { recursive: true, force: true });
await mkdir(".vercel/output/static", { recursive: true });
await cp("out", ".vercel/output/static", { recursive: true });
