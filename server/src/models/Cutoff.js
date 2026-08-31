import mongoose from "mongoose";

const cutoffSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
      required: true,
    },
    year: Number,
    round: Number,

    institute: {
      type: String,
      required: true,
    },

    branch: String,
    instituteType: String,

    category: String,
    quota: String,
    gender: String,

    openingRank: Number,
    closingRank: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cutoff", cutoffSchema);