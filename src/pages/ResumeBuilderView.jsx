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

const ResumeBuilderView = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    summary: "",
    template: "classic",
    accentColor: "darkblue",
    education: [],
    exprience: [], // (Anda mungkin ingin memperbaiki typo 'exprience' menjadi 'experiences' di masa depan sesuai skema)
    personalInfo: {},
    project: [],
    public: false,
    skills: [],
    achievements: [], // PENAMBAHAN: Tambahkan achievements sesuai skema Mongoose
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  // PENAMBAHAN: Tambahkan "Achievements" dan "Settings" ke daftar sections
  const sections = [
    { id: "personal", name: "Personal Info" },
    { id: "summary", name: "Summary" },
    { id: "education", name: "Education" },
    { id: "experience", name: "Experience" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "achievements", name: "Achievements" },
    { id: "setting", name: "Setting" },
  ];

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log("Form Tersubmit:", resumeData);
  };

  useEffect(() => {
    const GetResumeDataById = async () => {
      try {
        const response = await api.get(`/resume/${resumeId}`);
        console.log(response.data.resume);
        setResumeData(response.data.resume);
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

        {/* Tombol Kembali ke Dashboard (Sebagai pengganti "Navbar" pada gambar referensi jika Anda belum memiliki komponen Navbar di atasnya) */}
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

        {/* 
          IMPLEMENTASI LAYOUT BERDASARKAN GAMBAR REFERENSI
          Membagi layar menjadi 12 kolom (grid-cols-12) agar proporsional
        */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* KOLOM 1 & 2: Sidebar Menu Sections (Menu Navigasi) */}
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

          {/* KOLOM 3: Area Input (Bagian setiap section contoh "Personal Info") */}
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-xl p-6 min-h-[500px]">
            <form onSubmit={handleSubmitForm} className="h-full flex flex-col">

              <div className="flex-1 mb-6">

                {/* 1. BAGIAN PERSONAL INFO */}
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


                {/* 2. BAGIAN SUMMARY (Contoh tempat menaruh SummaryForm nantinya) */}
                {sections[activeSectionIndex]?.id === "summary" && (
                  <div className="h-full flex flex-col">
                      <div className="h-full flex flex-col">
                        <SummaryForm
                          data={resumeData.summary}
                          onChange={(val) => setResumeData({ ...resumeData, summary: val })}
                        />
                      </div>
                  </div>
                )}

                {/* 3. BAGIAN EDUCATION (Pendidikan) */}
                {sections[activeSectionIndex]?.id === "education" && (
                  <div className="h-full flex flex-col">
                    <div className="h-full flex flex-col">
                      <EducationForm 
                        data={resumeData.education} 
                        onChange={(arr) => setResumeData({ ...resumeData, education: arr })} 
                      /> 
                    </div>
                  </div>
                )}

                {/* 4. BAGIAN EXPERIENCE (Pengalaman Kerja) */}
                {sections[activeSectionIndex]?.id === "experience" && (
                  <div className="h-full flex flex-col">                    
                    <div className="h-full flex flex-col">
                      <ExperienceForm 
                        data={resumeData.experiences} 
                        onChange={(arr) => setResumeData({ ...resumeData, experiences: arr })} 
                      /> 
                    </div>                    
                  </div>
                )}

                {/* 5. BAGIAN PROJECTS (Proyek) */}
                {sections[activeSectionIndex]?.id === "projects" && (
                  <div className="h-full flex flex-col">
                    <div className="h-full flex flex-col">
                      <ProjectsForm 
                        data={resumeData.project || []} 
                        onChange={(arr) => setResumeData({ ...resumeData, project: arr })} 
                      /> 
                    </div>
                  </div>
                )}

                {/* 6. BAGIAN SKILLS (Keahlian) */}
                {sections[activeSectionIndex]?.id === "skills" && (
                  <div className="h-full flex flex-col">
                    <div className="h-full flex flex-col">
                      <SkillsForm 
                        data={resumeData.skills} 
                        onChange={(val) => setResumeData({ ...resumeData, skills: val })} 
                      /> 
                    </div>
                  </div>
                )}

                {/* 7. BAGIAN ACHIEVEMENTS (Penghargaan) */}
                {sections[activeSectionIndex]?.id === "achievements" && (
                  <div className="h-full flex flex-col">
                    <div className="h-full flex flex-col">
                      <AchievementsForm 
                        data={resumeData.achievements || []} 
                        onChange={(arr) => setResumeData({ ...resumeData, achievements: arr })} 
                      /> 
                    </div>
                  </div>
                )}

            
                {/* 8. BAGIAN SETTINGS (Pengaturan Background, Tema, dll) */}
                {sections[activeSectionIndex]?.id === "setting" && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-6 border-b border-neutral-800 pb-2">
                      Settings
                    </h2>
                    
                  </div>
                )}

              </div>

              {/* Tombol Simpan (Selalu berada di paling bawah form) */}
              <button type="submit" className="bg-violet-600 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer w-full hover:bg-violet-700 transition mt-auto">
                Simpan Perubahan
              </button>
            </form>
          </div>

          {/* KOLOM 4: Area Preview (Gambaran CV) */}
          <div className="lg:col-span-6 bg-white rounded-xl min-h-[800px] flex items-center justify-center relative overflow-hidden">
            {/* Kertas A4 Kosong sebagai representasi Preview CV */}
            <div className="text-neutral-400 text-lg font-medium">
              Gambaran CV (Preview)
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default ResumeBuilderView;