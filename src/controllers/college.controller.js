import { predictColleges } from "../services/collegePredictor.js";

export const predictCollege = async (req, res) => {
  try {
    const {
      exam,
      rank,
      category,
      gender,
      quota,
      state,
      branch,
    } = req.body;

    if (!exam || !rank || !category || !gender || !quota) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const numericRank = Number(rank);

    if (!Number.isFinite(numericRank) || numericRank <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid rank",
      });
    }

    const colleges = await predictColleges({
      exam,
      rank: numericRank,
      category,
      gender,
      quota,
      state,
      branch,
    });

    return res.status(200).json({
      success: true,
      count: colleges.length,
      data: colleges,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to predict colleges",
    });
  }
};