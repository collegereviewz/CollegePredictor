import mongoose from "mongoose";
import csv from "csvtojson";
import path from "path";
import dotenv from "dotenv";
import JosaaSeat from "../models/josaaseat.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const files = [
  { file: "wbjee_round1.csv", round: 1 },
  { file: "wbjee_round2.csv", round: 2 }
];

const run = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB connected");

  for (const f of files) {
    const filePath = path.join("src/data", f.file);
    const rows = await csv().fromFile(filePath);

    const docs = rows.map(row => {
      if (!row["Institute"] || !row["Opening Rank"] || !row["Closing Rank"]) {
        return null;
      }

      return {
        institute: row["Institute"].trim(),
        academicProgram: row["Program"]?.trim(),

        instituteType: "WBJEE", // 👈 important (not IIT/NIT)

        quota: row["Quota"] === "Home State" ? "HS" : "AI",
        domicileState: row["Quota"] === "Home State" ? "West Bengal" : null,

        seatType: row["Category"]?.replace(/\s+/g, " ").trim(),
        gender: "Gender-Neutral",

        openingRank: Number(row["Opening Rank"]),
        closingRank: Number(row["Closing Rank"]),

        round: f.round,
        year: 2025,
        exam: "WBJEE",
        course: "BTech",
        counselling: "WBJEE"
      };
    }).filter(Boolean);

    if (docs.length) {
      await JosaaSeat.insertMany(docs, { ordered: false });
    }

    console.log(`✅ Imported ${docs.length} rows from ${f.file}`);
  }

  console.log("🎉 WBJEE import completed");
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
