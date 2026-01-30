import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import csv from "csvtojson";
import path from "path";
import { fileURLToPath } from "url";

import JosaaSeat from "../models/josaaseat.model.js";

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
  throw new Error("❌ MONGO_URI is missing. Check your .env file.");
}

// -----------------------------
// CSV files config
// -----------------------------
const files = [
  { file: "josaa_round1.csv", round: 1 },
  { file: "josaa_round2.csv", round: 2 },
  { file: "josaa_round3.csv", round: 3 }
];

// -----------------------------
// Main runner
// -----------------------------
const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    for (const f of files) {
      const filePath = path.join(__dirname, "../../src/data", f.file);
      const rows = await csv().fromFile(filePath);

      const docs = rows.map(row => ({
        institute: row.Institute,
        academicProgram: row["Academic Program Name"],

        quota: row.Quota,
        seatType: row["Seat Type"],
        gender: row.Gender,

        openingRank: Number(row["Opening Rank"]),
        closingRank: Number(row["Closing Rank"]),

        round: f.round,
        year: 2025,
        exam: "JEE_MAIN",
        course: "BTech"
      }));

      await JosaaSeat.insertMany(docs, { ordered: false });
      console.log(`✅ Imported ${docs.length} rows from ${f.file}`);
    }

    await mongoose.disconnect();
    console.log("✅ Import completed successfully");
    process.exit(0);

  } catch (err) {
    console.error("❌ Import failed:", err.message);
    process.exit(1);
  }
};

run();
