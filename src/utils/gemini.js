import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeUrl) => {
  try {
    const response = await axios.get(resumeUrl, {
      responseType: "arraybuffer",
    });

    const pdfBase64 = Buffer.from(response.data).toString("base64");

    const prompt = `
You are an expert ATS Resume Analyzer, Technical Recruiter, and AI Career Counselor.

Analyze the uploaded resume thoroughly.

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT wrap the response inside triple backticks.
Do NOT add explanations before or after the JSON.
Every field must always be present.
If any information is unavailable, return an empty array [] or an empty string "".

Return JSON in the following format:

{
  "atsScore": 0,

  "scoreBreakdown": {
    "formatting": 0,
    "technicalSkills": 0,
    "projects": 0,
    "experience": 0,
    "atsKeywords": 0,
    "achievements": 0
  },

  "summary": "",

  "skills": {
    "programmingLanguages": [],
    "frontend": [],
    "backend": [],
    "databases": [],
    "tools": [],
    "coreSubjects": [],
    "other": []
  },

  "missingSkills": [],

  "strengths": [],

  "weaknesses": [],

  "careerRecommendations": [
    {
      "role": "",
      "matchPercentage": 0,
      "reason": "",
      "salaryRange": "",
      "requiredSkills": [],
      "difficulty": "",
      "nextStep": ""
    }
  ],

  "roadmap": {
    "1Month": [],
    "3Months": [],
    "6Months": []
  },

  "recommendedProjects": [
    {
      "name": "",
      "difficulty": "",
      "techStack": [],
      "description": ""
    }
  ],

  "certifications": [
    {
      "name": "",
      "provider": "",
      "priority": ""
    }
  ],

  "resumeKeywordsMissing": [],

  "atsImprovements": [],

  "interviewPreparation": {
    "technicalQuestions": [],
    "hrQuestions": []
  },

  "learningResources": [
    {
      "skill": "",
      "resource": "",
      "type": ""
    }
  ],

  "suggestions": []
}

Rules:

1. Return ONLY valid JSON.
2. Do not omit any field.
3. Recommend EXACTLY 5 careers sorted by highest match percentage.
4. Match salary ranges according to the Indian job market for freshers.
5. ATS Score must be an integer between 0 and 100.
6. ATS Score should be calculated using:
7. write salary like rupees symbol with rupees range  then lpa for example rupee symbol 6.0- 12.0 LPA. 
- Resume Formatting (20%)
- Technical Skills (20%)
- Projects (20%)
- Experience (15%)
- ATS Keywords (15%)
- Achievements & Certifications (10%)

7. Every career recommendation must include:
- Role
- Match Percentage
- Reason
- Salary Range
- Required Skills
- Difficulty (Easy/Medium/Hard)
- Immediate Next Step

8. Roadmap should contain practical weekly goals.

9. Recommended projects should be unique and portfolio-worthy.

10. Recommend certifications that are recognized by industry.

11. Interview questions must be personalized according to the candidate's resume.

12. Learning resources should recommend official documentation or well-known platforms.

13. Suggestions must be actionable and measurable.

14. Ensure the JSON is syntactically valid.
`;

    const result = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: pdfBase64,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const text = result.text.trim();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Gemini Error:", error);
    if (error.status === 500||error.status===503) {
    throw new Error(
      "AI service is currently busy. Please try again in a few moments."
    );
  }
  if (error.status === 429) {
    throw new Error(
      "AI quota exceeded. Please try again later."
    );
  }
    throw new Error("Resume analysis failed");
  }
};

export default analyzeResume;