import mongoose from "mongoose";

const JosaaSeatSchema = new mongoose.Schema({
  institute: String,
  academicProgram: String,

  instituteType: {
    type: String, // IIT | NIT | IIIT | GFTI
  },

  quota: String,        // AI | HS
  domicileState: String, // Required for HS

  seatType: String,     // OPEN | EWS | OBC-NCL | SC | ST | PwD
  gender: String,       // Gender-Neutral | Female-only

  openingRank: Number,
  closingRank: Number,

  round: Number,
  year: Number,
  exam: String,
  course: String,

  counselling: {
    type: String,
    enum: ["JOSAA", "CSAB","WBJEE"],
    required: true
  }
});

export default mongoose.model("JosaaSeat", JosaaSeatSchema);
