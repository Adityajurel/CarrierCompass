import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function ResumePreview({ resumeUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  if (!resumeUrl) {
    return null;
  }

  return (
    <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-5">

      <h2 className="mb-4 text-xl font-bold text-cyan-400">
        Resume Preview
      </h2>

      <div className="overflow-auto rounded-xl bg-slate-800 p-2">

        <Document
          file={resumeUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <Page
            pageNumber={pageNumber}
            width={430}
          />
        </Document>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <button
          onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
          disabled={pageNumber === 1}
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-white">
          {pageNumber} / {numPages}
        </span>

        <button
          onClick={() =>
            setPageNumber((p) =>
              Math.min(numPages, p + 1)
            )
          }
          disabled={pageNumber === numPages}
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default ResumePreview;