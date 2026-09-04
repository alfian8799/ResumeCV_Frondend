import { useEffect, useState } from "react";
import { Download, Printer } from "lucide-react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import api from "../configs/axios.js";
import ResumePreview from "../components/ResumePreview.jsx";

const PreviewView = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      try {
        const response = await api.get(`/resume/public/${resumeId}`);
        setResume(response.data.resume);
      } catch (requestError) {
        console.error("Gagal mengambil resume publik:", requestError);
        setError("Resume tidak ditemukan atau belum dipublikasikan.");
      }
    };

    if (resumeId) loadResume();
  }, [resumeId]);

  const handleDownload = async () => {
    const element = document.querySelector("#preview-classic, #preview-modern-template");
    if (!element) return;

    const sanitizePdfColors = (clonedDocument) => {
      const colorProperties = [
        "color",
        "backgroundColor",
        "borderTopColor",
        "borderRightColor",
        "borderBottomColor",
        "borderLeftColor",
        "outlineColor",
        "textDecorationColor",
      ];

      clonedDocument.querySelectorAll("*").forEach((child) => {
        const computedStyle = clonedDocument.defaultView.getComputedStyle(child);
        colorProperties.forEach((property) => {
          if (computedStyle[property]?.includes("oklch")) {
            child.style[property] = property === "backgroundColor" ? "#ffffff" : "#374151";
          }
        });
      });
    };

    await html2pdf().set({
      margin: 0,
      filename: `${resume?.title || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: sanitizePdfColors,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    }).from(element).save();
  };

  if (error) return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">{error}</div>;
  if (!resume) return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">Memuat resume...</div>;

  return (
    <div className="min-h-screen bg-neutral-900 py-6">
      <div className="print:hidden max-w-[210mm] mx-auto px-4 mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => window.print()} className="bg-neutral-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Printer className="size-4" /> Print
        </button>
        <button type="button" onClick={handleDownload} className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download className="size-4" /> Download
        </button>
      </div>
      <ResumePreview data={resume} template={resume.template} accentColor={resume.accentColor || "#8b5cf6"} />
    </div>
  );
};

export default PreviewView