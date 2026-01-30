import JosaaSeat from "../models/josaaseat.model.js";

export const predictColleges = async (req, res) => {
  try {
    const {
      rank,
      category,
      gender,
      rounds = [1, 2, 3]
    } = req.body;

    const results = await JosaaSeat.find({
      exam: "JEE_MAIN",
      course: "BTech",
      year: 2025,
      seatType: category,
      gender: { $in: [gender, "Gender-Neutral"] },
      round: { $in: rounds },
      closingRank: { $gte: rank }
    }).sort({ closingRank: 1 });

    const formatted = results.map(r => {
      let chance = "Dream";
      if (rank <= r.closingRank * 0.7) chance = "Safe";
      else if (rank <= r.closingRank) chance = "Moderate";

      return {
        institute: r.institute,
        academicProgram: r.academicProgram,
        round: r.round,
        openingRank: r.openingRank,
        closingRank: r.closingRank,
        seatType: r.seatType,
        gender: r.gender,
        chance
      };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
