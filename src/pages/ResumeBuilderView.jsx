import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const ResumeBuilderView = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    summary: "",
    template: "1", // Default template diset "1" atau "classic"
    accentColor: "#8b5cf6",
    education: [],
    experiences: [],
    personalInfo: {},
    project: [],
    public: false,
    skills: [],
    achievements: [],
    fontFamily: "Arial",
    textSize: "Medium",
    fontSizeNum: 14,
    textAlign: "left",
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info" },
    { id: "summary", name: "Summary" },
    { id: "education", name: "Education" },
    { id: "experience", name: "Experience" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "achievements", name: "Achievements" },
    { id: "setting", name: "Setting" },
    { id: "template", name: "Template" },
  ];

  // FUNGSI SIMPAN PERUBAHAN KE BACKEND & DATABASE
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("resumeData", JSON.stringify(resumeData));
      removeBackground && formData.append("removeBackground", true);
      typeof resumeData.personalInfo.image === "object" && formData.append("image  ", resumeData.image);
      const response = await api.put(`/resume/${resumeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResumeData(response.data.resume);

      alert("Perubahan resume berhasil disimpan!");

    } catch (error) {
      console.error("Gagal menyimpan resume:", error);
      alert("Gagal menyimpan perubahan ke database.");
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
          experiences: dataRes.experiences || dataRes.exprience || []
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
        <div className="w-full flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
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

        {/* Layout Utama Grid 12 Kolom */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Kolom 1-2: Sidebar Navigasi Sections */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {sections.map((sec, index) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionIndex(index)}
                className={`text-left px-4 py-3 border rounded-md text-sm font-medium transition cursor-pointer ${activeSectionIndex === index
                  ? 'bg-violet-600 border-violet-500 text-white'
                  : 'bg-transparent border-neutral-700 text-neutral-400 hover:border-neutral-500'
                  }`}
              >
                {sec.name}
              </button>
            ))}
          </div>

          {/* Kolom 3-6: Area Form Input */}
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-125">
            <form onSubmit={handleSubmitForm} className="h-full flex flex-col">

              <div className="flex-1 mb-6">
                {sections[activeSectionIndex]?.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personalInfo}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personalInfo: data
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
                    data={resumeData.project || []}
                    onChange={(arr) => setResumeData({ ...resumeData, project: arr })}
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

                {sections[activeSectionIndex]?.id === "setting" && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">
                      Settings
                    </h2>
                    <p className="text-sm text-neutral-400">Pengaturan tambahan untuk tema atau visibilitas resume.</p>
                  </div>
                )}
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


                {/* Bagian Pilihan Template yang Interaktif */}
                {sections[activeSectionIndex]?.id === "template" && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">
                      Template Selection
                    </h2>
                    <p className="text-sm text-neutral-400 mb-6">Pilih templat resume profesional yang sesuai dengan gaya Anda.</p>

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

                      {/* Pilihan Template Classic / Template 2 */}
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

          {/* Kolom 7-12: Area Live Preview */}
          <div
            className="lg:col-span-6 bg-neutral-100 rounded-xl h-200 flex justify-center relative overflow-y-auto custom-scrollbar border border-neutral-800 transition-all">
            <div></div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accentColor || "#8b5cf6"}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default ResumeBuilderView;