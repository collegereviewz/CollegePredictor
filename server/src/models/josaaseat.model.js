import mongoose from "mongoose";

const JosaaSeatSchema = new mongoose.Schema({
  institute: String,
  academicProgram: String,

  quota: String,
  seatType: String,
  gender: String,

  openingRank: Number,
  closingRank: Number,

  round: Number,
  year: Number,
  exam: String,
  course: String
});

export default mongoose.model("JosaaSeat", JosaaSeatSchema);
