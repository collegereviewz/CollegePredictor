import CcmtGateSeat from "../models/ccmtGateseat.model.js";

// 🔁 PROGRAM → GATE GROUP MAP
const PROGRAM_TO_GROUP = {
  CS: "Group 1",
  IT: "Group 1",
  AI: "Group 1",
  DS: "Group 1",

  EE: "Group 2",
  EC: "Group 2",
  ECE: "Group 2",

  ME: "Group 3",
  CE: "Group 3",
  IN: "Group 3"
};

export const predictGateColleges = async (req, res) => {
  try {
    const {
      gateScore,
      academicProgram,
      category = "OPEN",
      gender = "Gender-Neutral",
      domicile,
      rounds = [1, 2, 3, 4, 5, 6]
    } = req.body;

    if (!gateScore || !academicProgram) {
      return res.status(400).json({
        error: "gateScore and academicProgram are required"
      });
    }

    // ✅ FIX 1: TRIM + NORMALIZE
    const programKey = academicProgram.trim().toUpperCase();
    const gateGroup = PROGRAM_TO_GROUP[programKey];

    if (!gateGroup) {
      return res.status(400).json({
        error: `Unsupported academic program: ${academicProgram}`
      });
    }

    // ✅ FIX 2: QUERY gateGroup (NOT gatePaper)
    const query = {
      exam: "GATE",
      counselling: "CCMT",
      course: "MTech",
      year: 2025,

      gateGroup,                         // 🔥 CORRECT FIELD
      seatType: category.toUpperCase(),

      minGateScore: { $lte: gateScore },
      maxGateScore: { $gte: gateScore },
      round: { $in: rounds }
    };

    if (gender) {
      query.gender = gender;
    }

    if (domicile) {
      query.$or = [
        { quota: "AI" },
        { quota: "HS", domicileState: domicile }
      ];
    }

    console.log("🔍 FINAL GATE QUERY:", query);

    const results = await CcmtGateSeat
      .find(query)
      .sort({ minGateScore: -1 })
      .limit(200);

    const formatted = results.map(r => {
      let chance = "Dream";
      if (gateScore >= r.minGateScore + 30) chance = "Safe";
      else if (gateScore >= r.minGateScore) chance = "Moderate";

      return {
        institute: r.institute,
        academicProgram: r.academicProgram,
        gateGroup: r.gateGroup,
        instituteType: r.instituteType,
        quota: r.quota,
        domicileState: r.domicileState,
        round: r.round,
        minGateScore: r.minGateScore,
        maxGateScore: r.maxGateScore,
        seatType: r.seatType,
        gender: r.gender,
        chance
      };
    });

    res.json(formatted);

  } catch (err) {
    console.error("❌ GATE prediction error:", err);
    res.status(500).json({ error: err.message });
  }
};
