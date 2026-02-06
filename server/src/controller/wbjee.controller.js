// server/src/controllers/wbjee.controller.js

import JosaaSeat from "../models/josaaseat.model.js";

export const predictWBJEEColleges = async (req, res) => {
  try {
    // ✅ ONLY THESE 4 FIELDS REQUIRED
    const { rank, category = "OPEN", domicile, exam } = req.body;

    if (!rank || exam !== "WBJEE" || !domicile) {
      return res.status(400).json({ 
        error: "Required: rank, exam=WBJEE, category, domicile" 
      });
    }

    // --------------------------------------------------
    // WBJEE SPECIFIC QUERY - EXACTLY 4 FIELDS
    // --------------------------------------------------
    const query = {
      course: "BTech",
      year: 2025,
      exam: "WBJEE",
      closingRank: { $gte: Number(rank) },
      instituteType: "WBJEE"
    };

    // ✅ Category filter (Open/SC/ST/OBCA/OBCB etc.)
    if (category !== "ALL") {
      query.seatType = category;
    }

    // ✅ Domicile logic - West Bengal gets priority quotas
    if (domicile === "West Bengal") {
      query.$or = [
        { quota: { $in: ["WBJEE", "HS"] } },
        { quota: "AI" },
        { domicileState: "West Bengal" }
      ];
    } else {
      query.quota = "AI";
    }

    console.log("🔍 WBJEE QUERY:", JSON.stringify(query, null, 2));

    // --------------------------------------------------
    // FETCH RESULTS
    // --------------------------------------------------
    const results = await JosaaSeat
      .find(query)
      .sort({ closingRank: 1 })
      .limit(100);

    // --------------------------------------------------
    // FORMAT WITH CHANCE
    // --------------------------------------------------
    const formatted = results.map(r => {
      let chance = "Dream";
      const closing = r.closingRank;
      if (rank <= closing * 0.7) chance = "Safe";
      else if (rank <= closing) chance = "Moderate";

      return {
        institute: r.institute,
        academicProgram: r.academicProgram,
        instituteType: r.instituteType,
        quota: r.quota,
        domicileState: r.domicileState,
        round: r.round,
        openingRank: r.openingRank,
        closingRank: closing,
        seatType: r.seatType,
        gender: r.gender || "N/A",
        counselling: "WBJEE",
        chance
      };
    });

    res.json(formatted);

  } catch (err) {
    console.error("❌ WBJEE Prediction error:", err);
    res.status(500).json({ error: err.message });
  }
};
