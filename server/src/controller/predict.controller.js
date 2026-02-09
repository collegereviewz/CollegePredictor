// server/src/controllers/predict.controller.js

import JosaaSeat from "../models/josaaseat.model.js";

export const predictColleges = async (req, res) => {
  try {
    const {
      rank,
      category = "OPEN",
      gender = "Gender-Neutral",
      domicile,
      rounds = [1, 2, 3, 4, 5, 6],
      exam
    } = req.body;

    if (!rank || !exam) {
      return res.status(400).json({ error: "rank and exam are required" });
    }
    // normalize exam coming from frontend
    const normalizedExam =
      exam === "STATE_ENGG" || exam === "WBJEE / State CET"
        ? "WBJEE"
        : exam;


    // --------------------------------------------------
    // BASE QUERY (COMMON & SAFE)
    // --------------------------------------------------
    const query = {
      course: "BTech",
      year: 2025,
      gender: { $in: [gender, "Gender-Neutral"] },
      round: { $in: rounds },
      closingRank: { $gte: Number(rank) }
    };

    // seatType optional
    if (category && category !== "ALL") {
      query.seatType = category;
    }

    // --------------------------------------------------
    // EXAM-SPECIFIC LOGIC (ONLY THIS CHANGES)
    // --------------------------------------------------

    // 🔵 JEE MAIN → NIT + IIIT + GFTI (NO IITs)
    if (exam === "JEE_MAIN") {
      query.exam = "JEE_MAIN";
      query.counselling = "JOSAA";

      query.instituteType = {
        $in: ["NIT", "IIIT", "GFTI"]
      };

      query.$or = [
        { quota: "AI" },
        { quota: "HS" },
        { quota: "HS", domicileState: domicile }
      ];
    }

    // 🔴 JEE ADVANCED → ONLY IITs
    else if (exam === "JEE_ADV") {
      query.exam = "JEE_MAIN"; // IIT data stored under JEE_MAIN
      query.counselling = "JOSAA";

      query.instituteType = "IIT";

      query.$or = [
        { quota: "AI" },
        { quota: "HS" },
        { quota: "HS", domicileState: domicile }
      ];
    }

    // 🟢 WBJEE → WBJEE COUNSELLING + WBJEE INSTITUTES
    // else if (normalizedExam === "WBJEE") {
    //   query.exam = "WBJEE";
    //   query.counselling = "WBJEE";
    //   query.instituteType = "WBJEE";

    //   // ✅ WBJEE HAS ONLY 2 ROUNDS
    //   query.round = { $in: [1, 2] };

    //   // ✅ WBJEE uses seatType like Open, SC, ST
    //   if (category && category !== "ALL") {
    //     query.seatType = category;
    //   }

    //   // ✅ DO NOT FILTER GENDER (WBJEE DATA IS CLEAN)
    //   delete query.gender;

    //   // ✅ SIMPLE QUOTA LOGIC
    //   query.$or = [
    //     { quota: "AI" },
    //     { quota: "Home State" },
    //     { quota: "WBJEE" }
    //   ];
    // }






    else {
      return res.status(400).json({ error: "Invalid exam type" });
    }

    console.log("🔍 FINAL QUERY:", JSON.stringify(query, null, 2));

    // --------------------------------------------------
    // FETCH
    // --------------------------------------------------
    const results = await JosaaSeat
      .find(query)
      .sort({ closingRank: 1 })
      .limit(500);

    console.log(`✅ Found ${results.length} results`);

    // --------------------------------------------------
    // FORMAT RESPONSE
    // --------------------------------------------------
    const formatted = results.map(r => {
      let chance = "Dream";
      if (rank <= r.closingRank * 0.7) chance = "Safe";
      else if (rank <= r.closingRank) chance = "Moderate";

      return {
        institute: r.institute,
        academicProgram: r.academicProgram,
        instituteType: r.instituteType,
        quota: r.quota,
        domicileState: r.domicileState,
        round: r.round,
        openingRank: r.openingRank,
        closingRank: r.closingRank,
        seatType: r.seatType,
        gender: r.gender,
        counselling: r.counselling,
        chance
      };
    });

    res.json(formatted);

  } catch (err) {
    console.error("❌ Prediction error:", err);
    res.status(500).json({ error: err.message });
  }
};
