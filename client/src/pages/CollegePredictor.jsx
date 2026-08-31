
import { useMemo, useState } from "react";
import axios from "axios";

const CollegePredictor = () => {
  const [form, setForm] = useState({
    exam: "JEE",
    rank: "",
    category: "OPEN",
    quota: "General",
    gender: "Unreserved",
    state: "",
    branch: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    /*
      NEET currently has only MBBS
      in our dataset.
    */

    if (name === "exam" && value === "NEET") {
      setForm((prev) => ({
        ...prev,
        exam: "NEET",
        category: "OPEN",
        quota: "General",
        gender: "Unreserved",
        branch: "MBBS",
      }));
    }

    if (name === "exam" && value === "JEE") {
      setForm((prev) => ({
        ...prev,
        exam: "JEE",
        category: "OPEN",
        quota: "General",
        gender: "Unreserved",
        branch: "",
      }));
    }
  };

  /* =========================================
     SUBMIT
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (!form.rank || Number(form.rank) <= 0) {
      setError("Please enter a valid rank.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/v1/college/predict",
        {
          exam: form.exam,
          rank: Number(form.rank),
          category: "OPEN",
          gender: form.gender,
          quota: form.quota,
          state: form.state || undefined,
          branch:
            form.exam === "NEET"
              ? "MBBS"
              : form.branch || undefined,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.response?.data?.message ||
          "Prediction failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     CHANCE STYLE
  ========================================= */

  const getChanceStyle = (chance) => {
    switch (chance) {
      case "Safe":
        return {
          badge:
            "border-green-500/30 bg-green-500/10 text-green-400",
          dot: "bg-green-400",
        };

      case "Target":
        return {
          badge:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
          dot: "bg-yellow-400",
        };

      case "Reach":
        return {
          badge:
            "border-red-500/30 bg-red-500/10 text-red-400",
          dot: "bg-red-400",
        };

      default:
        return {
          badge:
            "border-slate-600 bg-slate-800 text-slate-300",
          dot: "bg-slate-400",
        };
    }
  };

  /* =========================================
     SAFE VALUE
  ========================================= */

  const displayValue = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "N/A" ||
      value === "NA"
    ) {
      return "N/A";
    }

    return value;
  };

  /* =========================================
     RESULT SUMMARY
  ========================================= */

  const summary = useMemo(() => {
    if (!result?.data) {
      return {
        safe: 0,
        target: 0,
        reach: 0,
      };
    }

    return {
      safe: result.data.filter(
        (college) => college.chance === "Safe"
      ).length,

      target: result.data.filter(
        (college) => college.chance === "Target"
      ).length,

      reach: result.data.filter(
        (college) => college.chance === "Reach"
      ).length,
    };
  }, [result]);

  /* =========================================
     SCORE BAR
  ========================================= */

  const getScoreWidth = (score) => {
    const numericScore = Number(score);

    if (!Number.isFinite(numericScore)) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(100, numericScore)
    );
  };

  /* =========================================
     RANK POSITION
  ========================================= */

  const getRankPosition = (
    openingRank,
    closingRank,
    userRank
  ) => {
    const opening = Number(openingRank);
    const closing = Number(closingRank);
    const rank = Number(userRank);

    if (
      !Number.isFinite(opening) ||
      !Number.isFinite(closing) ||
      !Number.isFinite(rank) ||
      closing <= opening
    ) {
      return 50;
    }

    const position =
      ((rank - opening) /
        (closing - opening)) *
      100;

    return Math.max(
      0,
      Math.min(100, position)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
            AI-Powered College Prediction
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            College Predictor
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Find colleges that match your rank,
            exam and preferences using historical
            cutoff data.
          </p>
        </div>

        {/* =====================================
            FORM
        ===================================== */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl sm:p-7">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          >

            {/* Exam */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Exam
              </label>

              <select
                name="exam"
                value={form.exam}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              >
                <option value="JEE">
                  JEE
                </option>

                <option value="NEET">
                  NEET
                </option>
              </select>
            </div>

            {/* Rank */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Rank
              </label>

              <input
                type="number"
                name="rank"
                value={form.rank}
                onChange={handleChange}
                placeholder="Enter your rank"
                min="1"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                name="category"
                value="OPEN"
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white opacity-80"
              >
                <option value="OPEN">
                  OPEN
                </option>
              </select>

              <p className="mt-1 text-xs text-slate-500">
                Currently available data: OPEN
              </p>
            </div>

            {/* Gender */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Gender
              </label>

              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              >
                <option value="Unreserved">
                  Unreserved
                </option>

                <option value="Female">
                  Female
                </option>
              </select>
            </div>

            {/* Quota */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Quota
              </label>

              <select
                name="quota"
                value={form.quota}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              >
                <option value="General">
                  General
                </option>

                <option value="HS">
                  Home State
                </option>

                <option value="OS">
                  Other State
                </option>
              </select>
            </div>

            {/* State */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Preferred State
              </label>

              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Optional e.g. Uttar Pradesh"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
              />
            </div>

            {/* Branch */}

            <div className="md:col-span-2 lg:col-span-3">
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Preferred Branch
              </label>

              {form.exam === "NEET" ? (
                <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">
                  <span className="font-medium text-white">
                    MBBS
                  </span>

                  <span className="ml-3 rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
                    Currently available
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="Optional e.g. Computer Science"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-cyan-500"
                />
              )}
            </div>

            {/* Submit */}

            <div className="md:col-span-2 lg:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-cyan-900/20 transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Finding Best Colleges..."
                  : "Predict Colleges"}
              </button>
            </div>
          </form>

          {/* Error */}

          {error && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* =====================================
            RESULTS
        ===================================== */}

        {result && (
          <div className="mt-10">

            {/* Result Header */}

            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                Recommended Colleges
              </h2>

              <p className="mt-1 text-slate-400">
                Based on your {form.exam} rank of{" "}
                <span className="font-semibold text-white">
                  {Number(form.rank).toLocaleString()}
                </span>
                .
              </p>
            </div>

            {/* Summary */}

            {result.count > 0 && (
              <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

                {/* Safe */}

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                  <p className="text-sm text-slate-400">
                    Safe
                  </p>

                  <p className="mt-1 text-3xl font-bold text-green-400">
                    {summary.safe}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Strong historical fit
                  </p>
                </div>

                {/* Target */}

                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                  <p className="text-sm text-slate-400">
                    Target
                  </p>

                  <p className="mt-1 text-3xl font-bold text-yellow-400">
                    {summary.target}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Competitive options
                  </p>
                </div>

                {/* Reach */}

                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                  <p className="text-sm text-slate-400">
                    Reach
                  </p>

                  <p className="mt-1 text-3xl font-bold text-red-400">
                    {summary.reach}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Close to cutoff
                  </p>
                </div>
              </div>
            )}

            {/* No Results */}

            {result.count === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-2xl">
                  🎓
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  No colleges found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-slate-400">
                  Try changing your rank, state,
                  branch, quota or other preferences.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {result.data.map(
                  (college, index) => {
                    const chanceStyle =
                      getChanceStyle(
                        college.chance
                      );

                    const score =
                      getScoreWidth(
                        college.recommendationScore
                      );

                    const rankPosition =
                      getRankPosition(
                        college.openingRank,
                        college.closingRank,
                        form.rank
                      );

                    return (
                      <div
                        key={`${college.institute}-${college.branch}-${index}`}
                        className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-cyan-950/20"
                      >

                        {/* College Header */}

                        <div className="flex items-start justify-between gap-4">

                          <div className="min-w-0">

                            <h3 className="text-xl font-bold leading-tight text-white">
                              {college.institute}
                            </h3>

                            <p className="mt-2 font-medium text-cyan-400">
                              {college.branch}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                              📍 {college.state}
                            </p>
                          </div>

                          {/* Chance */}

                          <div
                            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${chanceStyle.badge}`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${chanceStyle.dot}`}
                            />

                            {college.chance}
                          </div>
                        </div>

                        {/* Recommendation Score */}

                        <div className="mt-6 rounded-xl border border-slate-700/50 bg-slate-800/50 p-4">

                          <div className="flex items-center justify-between">

                            <div>
                              <p className="text-sm text-slate-400">
                                Recommendation Score
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Based on rank & college factors
                              </p>
                            </div>

                            <span className="text-2xl font-bold text-cyan-400">
                              {college.recommendationScore}
                              <span className="text-sm text-slate-500">
                                /100
                              </span>
                            </span>
                          </div>

                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                              style={{
                                width: `${score}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Rank Information */}

                        <div className="mt-5">

                          <div className="mb-2 flex items-center justify-between text-xs">
                            <span className="text-slate-500">
                              Opening Rank
                            </span>

                            <span className="text-slate-500">
                              Your Rank
                            </span>

                            <span className="text-slate-500">
                              Closing Rank
                            </span>
                          </div>

                          <div className="flex items-center gap-3">

                            <span className="text-sm font-semibold text-white">
                              {displayValue(
                                college.openingRank
                              )}
                            </span>

                            <div className="relative h-2 flex-1 rounded-full bg-slate-700">

                              <div
                                className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-cyan-400 bg-slate-950 shadow-lg shadow-cyan-500/20"
                                style={{
                                  left: `calc(${rankPosition}% - 8px)`,
                                }}
                              />

                              <div
                                className="h-full rounded-full bg-cyan-500/40"
                                style={{
                                  width: `${rankPosition}%`,
                                }}
                              />
                            </div>

                            <span className="text-sm font-semibold text-white">
                              {displayValue(
                                college.closingRank
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Details */}

                        <div className="mt-6 grid grid-cols-2 gap-4">

                          <div className="rounded-xl bg-slate-800/70 p-4">
                            <p className="text-xs text-slate-400">
                              NIRF Rank
                            </p>

                            <p className="mt-1 font-semibold text-white">
                              {displayValue(
                                college.nirfRank
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-slate-800/70 p-4">
                            <p className="text-xs text-slate-400">
                              Seats
                            </p>

                            <p className="mt-1 font-semibold text-white">
                              {displayValue(
                                college.seats
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-slate-800/70 p-4">
                            <p className="text-xs text-slate-400">
                              Average Package
                            </p>

                            <p className="mt-1 font-semibold text-white">
                              {displayValue(
                                college.averagePackage
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-slate-800/70 p-4">
                            <p className="text-xs text-slate-400">
                              Highest Package
                            </p>

                            <p className="mt-1 font-semibold text-white">
                              {displayValue(
                                college.highestPackage
                              )}
                            </p>
                          </div>

                          <div className="rounded-xl bg-slate-800/70 p-4 sm:col-span-2">
                            <p className="text-xs text-slate-400">
                              Fees
                            </p>

                            <p className="mt-1 font-semibold text-white">
                              ₹
                              {displayValue(
                                college.fees
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Website */}

                        {college.website &&
                          college.website !== "N/A" && (
                            <a
                              href={
                                college.website
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-6 block w-full rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-cyan-400 transition hover:border-cyan-500 hover:bg-cyan-500/10"
                            >
                              Visit College Website →
                            </a>
                          )}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegePredictor;

