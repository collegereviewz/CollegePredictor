import mongoose from "mongoose";

const ccmtGateSeatSchema = new mongoose.Schema({
  institute: {
    type: String,
    required: true
  },

  academicProgram: {
    type: String, // e.g. Computer Science & Engineering
    required: true
  },

  gatePaper: {
    type: String, // CS | EE | ME | CE | EC | IN | etc.
    required: false,
    index: true
  },
  gateGroup:{
    type:String,//Group I | Group II | GroupIII
    required:false
  },

  instituteType: {
    type: String, // NIT | IIIT | GFTI
    required: true
  },

  seatType: {
    type: String, // OPEN | EWS | OBC-NCL | SC | ST | PwD
    required: true
  },

  gender: {
    type: String, // Gender-Neutral | Female-only
    default: "Gender-Neutral"
  },

  quota: {
    type: String, // Mostly AI in CCMT
    default: "AI"
  },

  minGateScore: {
    type: Number,
    required: true
  },

  maxGateScore: {
    type: Number
  },

  round: {
    type: Number,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  counselling: {
    type: String,
    default: "CCMT"
  },

  exam: {
    type: String,
    default: "GATE"
  },

  course: {
    type: String,
    default: "MTech"
  }
}, {
  timestamps: true
});

export default mongoose.model("CcmtGateSeat", ccmtGateSeatSchema, "ccmtgateseats");