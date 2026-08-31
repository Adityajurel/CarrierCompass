import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
      enum: ["JEE", "NEET"],
      required: true,
    },

    year: Number,

    institute: String,

    branch: String,

    state: String,

    quota: String,

    category: String,

    gender: String,

    round: Number,

    openingRank: Number,

    closingRank: Number,

    fees: String,

    nirfRank: Number,

    medianPackage: String,

    highestPackage: String,

    averagePackage: String,

    seats: Number,

    website: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("College", collegeSchema);