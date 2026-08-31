
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dns from "dns";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import College from "../models/college.model.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

/* =========================
   CLEAN NUMBER
========================= */

const toNumber = (value) => {
  if (value === undefined || value === null) return null;

  const cleaned = String(value)
    .trim()
    .replace(/\*/g, "")
    .replace(/"/g, "");

  if (
    cleaned === "" ||
    cleaned.toLowerCase() === "na" ||
    cleaned.toLowerCase() === "n/a" ||
    cleaned === "-"
  ) {
    return null;
  }

  const num = Number(cleaned);

  return Number.isFinite(num) ? num : null;
};

/* =========================
   CLEAN TEXT
========================= */

const cleanText = (value) => {
  if (value === undefined || value === null) return null;

  let cleaned = String(value)
    .trim()
    .replace(/\*/g, "")
    .replace(/^"+|"+$/g, "")
    .trim();

  // Convert markdown URL:
  // [https://example.com](https://example.com)
  // into:
  // https://example.com
  const markdownUrl = cleaned.match(
    /^\[(https?:\/\/[^)]+)\]\((https?:\/\/[^)]+)\)$/
  );

  if (markdownUrl) {
    cleaned = markdownUrl[2];
  }

  return cleaned === "" ? null : cleaned;
};

/* =========================
   CSV HEADERS
========================= */

const headers = [
  "exam",
  "year",
  "institute",
  "branch",
  "state",
  "quota",
  "category",
  "gender",
  "round",
  "openingRank",
  "closingRank",
  "fees",
  "nirfRank",
  "medianPackage",
  "highestPackage",
  "averagePackage",
  "seats",
  "website",
];

/* =========================
   READ CSV
========================= */

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const colleges = [];

    fs.createReadStream(filePath)
      .pipe(
        csv({
          headers,
          skipLines: 1,
        })
      )
      .on("data", (row) => {
        const exam = cleanText(row.exam);

        // Ignore empty / invalid rows
        if (!exam || !cleanText(row.institute)) {
          return;
        }

        colleges.push({
          exam: exam.toUpperCase(),

          year: toNumber(row.year),

          institute: cleanText(row.institute),

          branch: cleanText(row.branch),

          state: cleanText(row.state),

          quota: cleanText(row.quota),

          category: cleanText(row.category),

          gender: cleanText(row.gender),

          round: toNumber(row.round),

          openingRank: toNumber(row.openingRank),

          closingRank: toNumber(row.closingRank),

          fees: cleanText(row.fees),

          nirfRank: toNumber(row.nirfRank),

          medianPackage: cleanText(row.medianPackage),

          highestPackage: cleanText(row.highestPackage),

          averagePackage: cleanText(row.averagePackage),

          seats: toNumber(row.seats),

          website: cleanText(row.website),
        });
      })
      .on("end", () => {
        resolve(colleges);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

/* =========================
   IMPORT DATA
========================= */

const importData = async () => {
  try {
    console.log("====================================");
    console.log("Starting college data import...");
    console.log("====================================");

    await connectDB();

    console.log("Database connected.");

    /* =========================
       FILE PATHS
    ========================= */

    const dataPath = path.join(process.cwd(), "src", "data");

    const jeePath = path.join(dataPath, "josaa2025.csv");

    const neetPath = path.join(dataPath, "neet2025.csv");

    /* =========================
       CHECK FILES
    ========================= */

    console.log("\nChecking CSV files...");

    if (!fs.existsSync(jeePath)) {
      throw new Error(`JEE CSV file not found: ${jeePath}`);
    }

    if (!fs.existsSync(neetPath)) {
      throw new Error(`NEET CSV file not found: ${neetPath}`);
    }

    console.log("JEE CSV found  :", jeePath);
    console.log("NEET CSV found :", neetPath);

    /* =========================
       READ JEE
    ========================= */

    console.log("\nReading JEE CSV...");

    const jeeData = await readCSV(jeePath);

    console.log(`JEE rows found: ${jeeData.length}`);

    /* =========================
       READ NEET
    ========================= */

    console.log("\nReading NEET CSV...");

    const neetData = await readCSV(neetPath);

    console.log(`NEET rows found: ${neetData.length}`);

    /* =========================
       VALIDATION
    ========================= */

    if (jeeData.length === 0) {
      throw new Error("JEE CSV contains no valid rows.");
    }

    if (neetData.length === 0) {
      throw new Error("NEET CSV contains no valid rows.");
    }

    /* =========================
       DEBUG
    ========================= */

    console.log("\n========== JEE SAMPLE ==========");
    console.log(jeeData[0]);

    console.log("\n========== NEET SAMPLE ==========");
    console.log(neetData[0]);

    /* =========================
       REMOVE ONLY OLD JEE/NEET
       DATA
    ========================= */

    console.log("\nRemoving old JEE data...");

    const deletedJEE = await College.deleteMany({
      exam: "JEE",
    });

    console.log(
      `Old JEE records deleted: ${deletedJEE.deletedCount}`
    );

    console.log("\nRemoving old NEET data...");

    const deletedNEET = await College.deleteMany({
      exam: "NEET",
    });

    console.log(
      `Old NEET records deleted: ${deletedNEET.deletedCount}`
    );

    /* =========================
       INSERT JEE
    ========================= */

    console.log("\nInserting JEE data...");

    const insertedJEE = await College.insertMany(jeeData);

    console.log(
      `JEE colleges imported: ${insertedJEE.length}`
    );

    /* =========================
       INSERT NEET
    ========================= */

    console.log("\nInserting NEET data...");

    const insertedNEET = await College.insertMany(neetData);

    console.log(
      `NEET colleges imported: ${insertedNEET.length}`
    );

    /* =========================
       FINAL RESULT
    ========================= */

    console.log("\n====================================");
    console.log("COLLEGE DATA IMPORT SUCCESSFUL");
    console.log("====================================");

    console.log(`JEE  : ${insertedJEE.length} records`);
    console.log(`NEET : ${insertedNEET.length} records`);
    console.log(
      `TOTAL: ${insertedJEE.length + insertedNEET.length} records`
    );

    console.log("====================================\n");

    process.exit(0);
  } catch (error) {
    console.error("\n====================================");
    console.error("IMPORT FAILED");
    console.error("====================================");

    console.error(error);

    process.exit(1);
  }
};

/* =========================
   START
========================= */

importData();

