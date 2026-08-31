
import College from "../models/college.model.js";

/* =========================================
   SAFE NUMBER PARSER
========================================= */

const parseNumber = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const cleaned = String(value)
    .trim()
    .replace(/[₹,%*"]/g, "")
    .replace(/,/g, "");

  if (
    cleaned === "" ||
    cleaned.toLowerCase() === "na" ||
    cleaned.toLowerCase() === "n/a" ||
    cleaned === "-"
  ) {
    return null;
  }

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : null;
};

/* =========================================
   RECOMMENDATION SCORE

   Rank          → 60%
   NIRF          → 15%
   Package       → 10%
   Fees          → 10%
   Seats         → 5%

   Total         → 100
========================================= */

const calculateRecommendationScore = (college, rank) => {
  /* =========================================
     1. RANK SCORE - 60%
  ========================================= */

  const openingRank = parseNumber(college.openingRank);
  const closingRank = parseNumber(college.closingRank);

  let rankScore = 0;

  if (
    openingRank !== null &&
    closingRank !== null &&
    closingRank >= openingRank
  ) {
    const rankRange = closingRank - openingRank;

    if (rankRange === 0) {
      rankScore = rank <= closingRank ? 60 : 0;
    } else {
      /*
        Rank closer to opening rank
        = better recommendation
      */

      const position =
        (closingRank - rank) / rankRange;

      rankScore =
        Math.max(0, Math.min(60, position * 60));
    }
  }

  /* =========================================
     2. NIRF SCORE - 15%
  ========================================= */

  let nirfScore = 0;

  const nirfRank = parseNumber(college.nirfRank);

  if (nirfRank !== null && nirfRank > 0) {
    /*
      Rank 1  → 15
      Rank 10 → ~13.5
      Rank 20 → ~12
      Rank 50 → ~7.5
      Rank 100+ → 0
    */

    nirfScore = Math.max(
      0,
      Math.min(
        15,
        15 - (nirfRank - 1) * 0.15
      )
    );
  }

  /* =========================================
     3. PACKAGE SCORE - 10%
  ========================================= */

  let packageScore = 0;

  const averagePackage = parseNumber(
    college.averagePackage
  );

  if (
    averagePackage !== null &&
    averagePackage >= 0
  ) {
    /*
      Assumes package is stored in LPA.

      20 LPA or above → 10
      10 LPA          → 5
      5 LPA           → 2.5
    */

    packageScore = Math.min(
      10,
      (averagePackage / 20) * 10
    );
  }

  /* =========================================
     4. FEES SCORE - 10%
  ========================================= */

  let feesScore = 0;

  const fees = parseNumber(college.fees);

  if (fees !== null && fees >= 0) {
    if (fees <= 50000) {
      feesScore = 10;
    } else if (fees <= 100000) {
      feesScore = 8;
    } else if (fees <= 200000) {
      feesScore = 6;
    } else if (fees <= 300000) {
      feesScore = 4;
    } else if (fees <= 500000) {
      feesScore = 3;
    } else {
      feesScore = 1;
    }
  }

  /* =========================================
     5. SEATS SCORE - 5%
  ========================================= */

  let seatsScore = 0;

  const seats = parseNumber(college.seats);

  if (seats !== null && seats > 0) {
    seatsScore = Math.min(
      5,
      (seats / 200) * 5
    );
  }

  /* =========================================
     FINAL SCORE
  ========================================= */

  const totalScore =
    rankScore +
    nirfScore +
    packageScore +
    feesScore +
    seatsScore;

  return Math.round(
    Math.max(
      0,
      Math.min(100, totalScore)
    )
  );
};

/* =========================================
   CHANCE CALCULATION
========================================= */

const calculateChance = (college, rank) => {
  const closingRank = parseNumber(
    college.closingRank
  );

  const openingRank = parseNumber(
    college.openingRank
  );

  if (
    closingRank === null ||
    openingRank === null
  ) {
    return "Reach";
  }

  /*
    Difference between student's rank
    and historical closing rank.
  */

  const difference = closingRank - rank;

  /*
    Student rank is significantly better
    than closing rank.
  */

  if (difference >= closingRank * 0.30) {
    return "Safe";
  }

  /*
    Student rank is reasonably close
    but still better than closing rank.
  */

  if (difference >= closingRank * 0.10) {
    return "Target";
  }

  /*
    Student rank is very close to closing rank.
  */

  return "Reach";
};

/* =========================================
   MAIN PREDICTOR
========================================= */

export const predictColleges = async ({
  exam,
  rank,
  category,
  gender,
  quota,
  state,
  branch,
}) => {
  /* =========================================
     BASE QUERY
  ========================================= */

  const query = {
    exam: exam.toUpperCase(),

    category,

    gender,

    quota,

    openingRank: {
      $lte: rank,
    },

    closingRank: {
      $gte: rank,
    },
  };

  /* =========================================
     STATE FILTER
  ========================================= */

  if (state) {
    query.state = {
      $regex: `^${state.trim()}$`,
      $options: "i",
    };
  }

  /* =========================================
     BRANCH FILTER
  ========================================= */

  if (branch) {
    query.branch = {
      $regex: branch.trim(),
      $options: "i",
    };
  }

  /* =========================================
     DATABASE QUERY
  ========================================= */

  const colleges = await College.find(query)
    .lean();

  /* =========================================
     CREATE RECOMMENDATIONS
  ========================================= */

  const recommendations = colleges.map(
    (college) => {
      const chance = calculateChance(
        college,
        rank
      );

      const recommendationScore =
        calculateRecommendationScore(
          college,
          rank
        );

      return {
        institute: college.institute,

        branch: college.branch,

        state: college.state,

        chance,

        recommendationScore,

        openingRank: college.openingRank,

        closingRank: college.closingRank,

        nirfRank: college.nirfRank,

        fees: college.fees,

        medianPackage:
          college.medianPackage,

        averagePackage:
          college.averagePackage,

        highestPackage:
          college.highestPackage,

        seats: college.seats,

        website: college.website,
      };
    }
  );

  /* =========================================
     SORT BY RECOMMENDATION SCORE
  ========================================= */

  recommendations.sort(
    (a, b) => {
      return (
        b.recommendationScore -
        a.recommendationScore
      );
    }
  );

  return recommendations;
};

