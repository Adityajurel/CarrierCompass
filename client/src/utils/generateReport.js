import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateReport = (analysis) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("CareerCompass AI", 20, 20);

  doc.setFontSize(16);
  doc.text("Resume Analysis Report", 20, 32);

  doc.setFontSize(12);

  doc.text(`ATS Score : ${analysis.atsScore}/100`, 20, 48);

  doc.text("Summary", 20, 62);

  doc.setFontSize(10);

  doc.text(
    analysis.summary || "",
    20,
    72,
    {
      maxWidth: 170,
    }
  );

  autoTable(doc, {
    startY: 100,
    head: [["Category", "Score"]],
    body: [
      ["Formatting", analysis.scoreBreakdown.formatting],
      ["Technical Skills", analysis.scoreBreakdown.technicalSkills],
      ["Projects", analysis.scoreBreakdown.projects],
      ["Experience", analysis.scoreBreakdown.experience],
      ["ATS Keywords", analysis.scoreBreakdown.atsKeywords],
      ["Achievements", analysis.scoreBreakdown.achievements],
    ],
  });

  doc.save("CareerCompass-Resume-Report.pdf");
};