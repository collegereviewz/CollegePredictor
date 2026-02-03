import JosaaSeat from "../models/josaaseat.model.js";

export const predictColleges = async (req, res) => {
  try {
    const {
      rank,
      category,
      gender,
      domicile,
      counselling = "JOSAA",
      rounds
    } = req.body;

    const query = {
      exam: "JEE_MAIN",
      course: "BTech",
      year: 2025,

      counselling, // 🔥 THIS WAS MISSING

      seatType: category,
      gender: { $in: [gender, "Gender-Neutral"] },
      round: { $in: rounds },
      closingRank: { $gte: rank },

      $or: [
        { quota: "AI" },
        { quota: "HS", domicileState: domicile }
      ]
    };

    const results = await JosaaSeat.find(query).sort({ closingRank: 1 });

    const formatted = results.map(r => {
      let chance = "Dream";
      if (rank <= r.closingRank * 0.7) chance = "Safe";
      else if (rank <= r.closingRank) chance = "Moderate";

      return {
        institute: r.institute,
        academicProgram: r.academicProgram,
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
