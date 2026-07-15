import axios from "axios";
import pdfParse from "pdf-parse";

const extractTextFromPDF = async (pdfUrl) => {
    try {
        // Download PDF
        const response = await axios.get(pdfUrl, {
            responseType: "arraybuffer",
        });

        const pdfBuffer = Buffer.from(response.data);

        // Extract text
        const data = await pdfParse(pdfBuffer);

        return data.text;
    } catch (error) {
        console.error("PDF Extraction Error:", error.message);
        throw new Error("Failed to extract text from PDF");
    }
};

export default extractTextFromPDF;