import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, LayoutTemplate, Printer, Share } from 'lucide-react';
import html2pdf from "html2pdf.js";
import api from "../configs/axios.js";
import PersonalInfoForm from "../components/PersonalInfoForm.jsx";
import SummaryForm from "../components/SummaryForm.jsx";
import EducationForm from "../components/EducationForm.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import ProjectsForm from "../components/ProjectsForm.jsx";
import SkillsForm from "../components/SkillsForm.jsx";
import AchievementsForm from "../components/AchievementsForm.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import SettingForm from "../components/SettingForm.jsx";
import { useLanguage } from "../languageContext.js";

const ResumeBuilderView = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    summary: "",
    template: "1",
    accentColor: "#8b5cf6",
    education: [],
    experiences: [],
    personalInfo: {},
    projects: [],
    public: false,
    skills: [],
    achievements: [],
    fontFamily: "Arial",
    textSize: "Medium",
    fontSizeNum: 14,
    textAlign: "left",
    layout: {
      sectionOrder: ["experience", "education", "projects", "skills", "achievements"],
      sectionLayouts: {},
    },
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: t.personalInfo },
    { id: "summary", name: t.summary },
    { id: "education", name: t.education },
    { id: "experience", name: t.experience },
    { id: "projects", name: t.projects },
    { id: "skills", name: t.skills },
    { id: "achievements", name: t.achievements },
    { id: "setting", name: t.setting },
    { id: "template", name: t.template },
  ];

  const handleShareResume = () => {
    const frontendUrl = window.location.href.split('/app')[0]; // Mendapatkan URL frontend
    const resumeUrl = `${frontendUrl}/view/${resumeId}`; // URL resume yang akan dibagikan
    if (navigator.share) {
      navigator.share({
        title: 'My Resume',
        text: 'Check out my resume!',
        url: resumeUrl,
      })
        .then(() => console.log('Resume shared successfully!'))
        .catch((error) => console.error('Error sharing resume:', error));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(resumeUrl);
      setToastMessage("Link resume berhasil disalin.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };


  const handlePrintResume = () => {
    window.print();
  };

  const handleDownloadResume = async () => {
    const resumeElement = document.querySelector(
      resumeData.template === "modern" ? "#preview-modern-template" : "#preview-classic"
    );

    if (!resumeElement) {
      setToastMessage("Preview resume belum siap untuk diunduh.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
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

        clonedDocument.querySelectorAll("*").forEach((element) => {
          const computedStyle = clonedDocument.defaultView.getComputedStyle(element);

          colorProperties.forEach((property) => {
            const color = computedStyle[property];
            if (color?.includes("oklch")) {
              element.style[property] = property === "backgroundColor" ? "#ffffff" : "#374151";
            }
          });
        });
      };

      await html2pdf().set({
        margin: 0,
        filename: `${resumeData.title || "resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          onclone: sanitizePdfColors,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      }).from(resumeElement).save();
    } catch (error) {
      console.error("Gagal mengunduh resume:", error);
      setToastMessage("Gagal mengunduh resume.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // FUNGSI SIMPAN PERUBAHAN KE BACKEND & DATABASE
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append(
        "resumeData",
        JSON.stringify({
          ...resumeData,
          projects: resumeData.projects || [],
        })
      );

      if (removeBackground) {
        formData.append("removeBackground", "true");
      }

      if (resumeData.personalInfo?.image instanceof File) {
        formData.append("image", resumeData.personalInfo.image);
      }

      const response = await api.put(`/resume/${resumeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const savedResume = response.data.resume || response.data;

      setResumeData((previous) => ({
        ...previous,
        ...savedResume,
        projects: savedResume.projects || previous.projects || [],
      }));

      setToastMessage("Perubahan resume berhasil disimpan!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    } catch (error) {
      console.error("Gagal menyimpan resume:", error);

      setToastMessage("Gagal menyimpan perubahan ke database.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);

    }
  };

  // Mengambil data awal dari database saat halaman pertama kali dimuat atau di-refresh
  useEffect(() => {
    const GetResumeDataById = async () => {
      try {
        const response = await api.get(`/resume/${resumeId}`);
        const dataRes = response.data.resume;

        setResumeData({
          ...dataRes,
          template: dataRes.template || "1",
          experiences: dataRes.experiences || dataRes.exprience || [],
          projects: dataRes.projects || []
        });
      } catch (error) {
        console.log("Gagal mengambil data resume:", error);
      }
    };

    if (resumeId) {
      GetResumeDataById();
    }
  }, [resumeId]);

  return (
    <>
      <div className={`min-h-screen text-white p-6 md:p-8 pt-28 transition-colors ${removeBackground ? 'bg-transparent' : 'bg-black'}`}>

        {/* Tombol Kembali & Judul Resume */}
        <div className="print:hidden w-full flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
          <div>
            <button onClick={() => navigate('/app')} className="text-neutral-400 hover:text-white transition p-2 bg-neutral-900 rounded-lg cursor-pointer">
              ← Back
            </button>
            <div className="pt-8">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">Resume Name</span>
              <h1 className="text-3xl font-bold text-white">
                {resumeData.title || 'Untitled Resume'}
              </h1>
            </div>
          </div>
        </div>

        {/* Navigasi Section di Atas */}
        <div className="print:hidden w-full flex flex-wrap gap-2 mb-6 border-b border-neutral-800 pb-4">
          {sections.map((sec, index) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionIndex(index)}
              className={`px-3 py-2 border rounded-md text-xs md:text-sm font-medium transition cursor-pointer ${activeSectionIndex === index
                ? 'bg-violet-600 border-violet-500 text-white'
                : 'bg-transparent border-neutral-700 text-neutral-400 hover:border-neutral-500'
                }`}
            >
              {sec.name}
            </button>
          ))}
        </div>

        {/* Layout Utama: Form dan Preview */}
        <div className="print:block w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Area Form Input */}
          <div className="print:hidden lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-125">
            <form onSubmit={handleSubmitForm} className="h-full flex flex-col">

              <div className="flex-1 mb-6">
                {sections[activeSectionIndex]?.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo || {}}
                    onChange={(personalInfo) =>
                      setResumeData((previous) => ({
                        ...previous,
                        personalInfo,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {sections[activeSectionIndex]?.id === "summary" && (
                  <SummaryForm
                    data={resumeData.summary}
                    onChange={(val) => setResumeData({ ...resumeData, summary: val })}
                  />
                )}

                {sections[activeSectionIndex]?.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(arr) => setResumeData({ ...resumeData, education: arr })}
                  />
                )}

                {sections[activeSectionIndex]?.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experiences}
                    onChange={(arr) => setResumeData({ ...resumeData, experiences: arr })}
                  />
                )}

                {sections[activeSectionIndex]?.id === "projects" && (
                  <ProjectsForm
                    data={resumeData.projects || []}
                    onChange={(arr) => setResumeData({ ...resumeData, projects: arr })}
                  />
                )}

                {sections[activeSectionIndex]?.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(val) => setResumeData({ ...resumeData, skills: val })}
                  />
                )}

                {sections[activeSectionIndex]?.id === "achievements" && (
                  <AchievementsForm
                    data={resumeData.achievements || []}
                    onChange={(arr) => setResumeData({ ...resumeData, achievements: arr })}
                  />
                )}

                {/* Bagian Setting Form */}
                {sections[activeSectionIndex]?.id === "setting" && (
                  <SettingForm
                    data={resumeData}
                    onChange={(updatedSettings) =>
                      setResumeData((prev) => ({
                        ...prev,
                        ...updatedSettings
                      }))
                    }
                  />
                )}


                {/* Bagian Pilihan Template*/}
                {sections[activeSectionIndex]?.id === "template" && (
                  <div>
                    <div className="border-b border-neutral-800 pb-2 mb-2">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <LayoutTemplate className="size-5 text-violet-500" /> Template Selection
                      </h3>
                      <p className="text-sm text-neutral-400">Pilih templat resume profesional yang sesuai dengan gaya Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {/* Pilihan Template Modern */}
                      <div
                        onClick={() => setResumeData({ ...resumeData, template: "modern" })}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${resumeData.template === "modern" || resumeData.template === "1"
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-neutral-800 bg-neutral-950 hover:border-neutral-700"
                          }`}
                      >
                        <h3 className="text-sm font-semibold text-white">Modern Template</h3>
                        <p className="text-xs text-neutral-400 mt-1">Tata letak dua kolom dengan sidebar modern dan foto profil.</p>
                      </div>

                      {/* Pilihan Template*/}
                      <div
                        onClick={() => setResumeData({ ...resumeData, template: "classic" })}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${resumeData.template === "classic" || resumeData.template === "2"
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-neutral-800 bg-neutral-950 hover:border-neutral-700"
                          }`}
                      >
                        <h3 className="text-sm font-semibold text-white">Classic Corporate</h3>
                        <p className="text-xs text-neutral-400 mt-1">Tata letak profesional dengan header terpusat yang rapi.</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Tombol Simpan Perubahan */}
              <button type="submit" className="bg-violet-600 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer w-full hover:bg-violet-700 transition mt-auto">
                Simpan Perubahan
              </button>
            </form>
          </div>

          {/* Area Live Preview */}
          <div className="print:block lg:col-span-6 flex flex-col gap-4">
            <div className="print:hidden flex justify-between items-center bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Live Preview & Aksi</span>
                <span className="text-xs text-neutral-400">Unduh atau bagikan resume Anda ke publik</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintResume}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-all rounded-xl px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Printer className="size-4" />
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="bg-violet-600 hover:bg-violet-700 text-white transition-all rounded-xl px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="size-4" />
                   Download
                </button>
                <button
                  type="button"
                  onClick={handleShareResume}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-all rounded-xl px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Share className="size-4" />
                  Share
                </button>
              </div>
            </div>

            <div className="resume-builder-preview print:static print:h-auto print:min-h-0 print:overflow-visible print:block print:bg-white print:border-0 print:rounded-none bg-neutral-100 rounded-xl min-h-[297mm] flex justify-center relative overflow-y-auto custom-scrollbar border border-neutral-800 transition-all w-full">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accentColor || "#8b5cf6"}
              />
            </div>
          </div>
        </div>

        {/* Komponen Toast Popup */}
        {showToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-neutral-700 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up transition-all">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        )}

      </div>
    </>
  );
};

export default ResumeBuilderView;