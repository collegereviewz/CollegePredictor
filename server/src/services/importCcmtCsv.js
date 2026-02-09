import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import csv from "csvtojson";
import path from "path";
import { fileURLToPath } from "url";

import CcmtGateSeat from "../models/ccmtGateseat.model.js";
import { instituteStateMap } from "../data/instituteStateMap.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("❌ MONGO_URI missing");

const files = [
  { file: "ccmt_round1.csv", round: 1 },
  { file: "ccmt_round2.csv", round: 2 },
  { file: "ccmt_round3.csv", round: 3 },
  { file: "ccmt_specialround1.csv", round: 4 },
  { file: "ccmt_specialround2.csv", round: 5 },
  { file: "ccmt_nationalspotround1.csv", round: 6 },
];

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // 🔥 CLEAR OLD DATA
    await CcmtGateSeat.deleteMany({});
    console.log("🧹 Old CCMT data cleared");

    for (const f of files) {
      const filePath = path.join(__dirname, "../../src/data", f.file);
      const rows = await csv().fromFile(filePath);

      const docs = [];

      for (const row of rows) {
        // Inside your for (const row of rows) loop:
        const minGateScore = Number(row["Min Gate Score"] || row["Min GATE Score"]);
        const maxGateScore = Number(row["Max Gate Score"] || row["Max GATE Score"]);

        // Debugging: If rows are still skipping, see what headers the script actually sees
        if (docs.length === 0) console.log("Headers detected:", Object.keys(row));
        if (isNaN(minGateScore)) {
          console.warn("⚠️ Skipping row: Min GATE Score is not a number", row["Min GATE Score"]);
          continue;
        }

        if (!Number.isFinite(minGateScore)) continue;

        const institute = row.Institute?.trim();
        const quota = row.Quota?.trim() || "AI";

        const instituteType =
          institute?.includes("National Institute of Technology") ? "NIT"
            : institute?.includes("Indian Institute of Information Technology") ? "IIIT"
              : "GFTI";

        docs.push({
          institute,
          academicProgram: row["PG Program"]?.trim(),

          // ✅ BOTH REQUIRED FIELDS
          gatePaper: row["Gate Paper"]?.trim(), // CS / EE / ME
          gateGroup: row["Group"]?.trim(),      // Group I / Group II

          instituteType,
          seatType: row["Category"]?.trim(),
          gender: "Gender-Neutral",

          quota,
          domicileState:
            quota === "HS"
              ? instituteStateMap[institute] || null
              : null,

          minGateScore,
          maxGateScore,

          round: f.round,
          year: 2025,
          counselling: "CCMT",
          exam: "GATE",
          course: "MTech"
        });
      }

      try {
        const result = await CcmtGateSeat.insertMany(docs, { ordered: false });
        console.log(`✅ Actually saved ${result.length} rows to MongoDB`);
      } catch (err) {
        console.error(`❌ Insert partially failed. Error: ${err.message}`);
        // This will tell you exactly which field is missing or wrong
      }
    }

    const finalCount = await CcmtGateSeat.countDocuments();
    console.log(`✅ VERIFIED: There are ${finalCount} documents in the database right now.`);

    await mongoose.disconnect();
    console.log("🎉 CCMT import completed");
    process.exit(0);

  } catch (err) {
    console.error("❌ Import failed:", err);
    process.exit(1);
  }
};

run();
