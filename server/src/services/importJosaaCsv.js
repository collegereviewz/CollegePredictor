import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import csv from "csvtojson";
import path from "path";
import { fileURLToPath } from "url";

import JosaaSeat from "../models/josaaseat.model.js";
import { instituteStateMap } from "../data/instituteStateMap.js";

// -----------------------------
// ES module __dirname fix
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// Mongo URI check
// -----------------------------
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is missing in .env");
}

// -----------------------------
// CSV files config
// -----------------------------
const files = [
  {file: "josaa_round1.csv", round: 1 },
  {file: "josaa_round2.csv", round: 2 },
  {file: "josaa_round3.csv", round: 3 },
  { file: "josaa_round4.csv", round: 4 },
  { file: "josaa_round5.csv", round: 5 },
  { file: "josaa_round6.csv", round: 6 },
];

// -----------------------------
// Helper: safe number parser
// -----------------------------
const parseRank = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

// -----------------------------
// Main runner
// -----------------------------
const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // DEV ONLY: clear old data
    await JosaaSeat.deleteMany({});
    console.log("🧹 Old data cleared");

    for (const f of files) {
      const filePath = path.join(__dirname, "../../src/data", f.file);
      const rows = await csv().fromFile(filePath);

      const docs = [];

      for (const row of rows) {
        const openingRank = parseRank(row["Opening Rank"]);
        const closingRank = parseRank(row["Closing Rank"]);

        // ❌ Skip invalid rows
        if (openingRank === null || closingRank === null) {
          continue;
        }

        const institute = row.Institute?.trim();
        const quota = row.Quota?.trim();

        docs.push({
          institute,
          academicProgram: row["Academic Program Name"],

          quota,
          domicileState:
            quota === "HS"
              ? instituteStateMap[institute] || null
              : null,

          seatType: row["Seat Type"],
          gender: row.Gender,

          openingRank,
          closingRank,

          round: f.round,
          year: 2025,
          exam: "JEE_MAIN",
          course: "BTech",
          counselling: "JOSAA"  // 🔥 Added: Required by model schema
        });
      }

      await JosaaSeat.insertMany(docs, { ordered: false });
      console.log(`✅ Imported ${docs.length} valid rows from ${f.file}`);
    }

    await mongoose.disconnect();
    console.log("🎉 Import completed successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Import failed:", err);
    process.exit(1);
  }
};

run();
