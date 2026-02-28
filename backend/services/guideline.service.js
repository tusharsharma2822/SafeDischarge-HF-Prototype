import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedGuidelines = [];

export const initializeGuidelines = () => {
  const filePath = path.join(__dirname, "../data/hfGuidelines.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  cachedGuidelines = JSON.parse(raw);

  console.log("✅ Guidelines loaded (no embeddings).");
};

export const getCachedGuidelines = () => cachedGuidelines;