import { useState } from "react";
import api from "../configs/axios.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../languageContext.js";

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [resume, setResume] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { t } = useLanguage();

  // CREATE RESUME
  const handleCreateResume = async (e) => {
    e.preventDefault();
    try {
      setErrMsg("");
      await api.post("/resume", { title });
      alert("Resume Success");
      setShowCreateResume(false);
      setTitle("");
      getAllResume();
    } catch (error) {
      console.log("Gagal Menambah resume");
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server";
      setErrMsg(errorMessage);
    }
  };

  // DELETE RESUME
  const confirmDeleteResume = async () => {
    if (!selectedResume) return;
    try {
      setIsDeleting(true);
      await api.delete(`/resume/${selectedResume._id}`);
      setShowDeleteModal(false);
      setSelectedResume(null);
      getAllResume();
    } catch (error) {
      console.log("Gagal Menghapus resume");
      const errorMessage = error.response?.data?.message || "Terjadi kesalahan pada server";
      setErrMsg(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  // GET ALL RESUME
  const getAllResume = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/resume");
      setResume(response.data.resume || []);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Dashboard resume tidak dapat dimuat.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllResume();
  }, []);

  // OPEN CREATE RESUME
  const OpenShowCreateResume = () => {
    setShowCreateResume(true);
  };

  // CLOSE CREATE RESUME
  const CloseCreateResume = () => {
    setShowCreateResume(false);
    setErrMsg("");
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col pt-20">
        {/* Konten Utama Dashboard */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Bagian Sambutan & Tombol Buat CV Baru */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.dashboardTitle}</h1>
              <p className="text-white/60 text-sm mt-1">{t.dashboardDescription}</p>
            </div>
          </div>

          {/* Grid Daftar CV */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {isLoading && (
              <p className="text-sm text-white/60">Memuat resume...</p>
            )}

            {!isLoading && errMsg && !showCreateResume && (
              <p className="text-sm text-red-400">{errMsg}</p>
            )}

            {/* looping data resume dari database */}
            {resume.map((item, index) => {
              // Mengamankan data skills jika berupa array objek atau string
              const skillsArray = Array.isArray(item.skills) 
                ? item.skills.map(s => typeof s === 'object' ? (s.category || s.description) : s).join(", ") 
                : item.skills || "-";

              return (
                <div 
                  key={item._id || index}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-64 hover:border-violet-500/50 transition-all group"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-xs bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full font-medium">{t.atsFriendly}</span>

                      {/* tanggal pembuatan cv */}
                      <span className="text-xs text-white/40">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })} - {new Date(item.createdAt).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-violet-400 transition-colors">{item.title}</h3>

                    {/* skills */}
                    <p className="text-xs text-white/50 mt-1 truncate">{t.skills}: {skillsArray}</p>
                  </div>

                  {/* button edit, delete, download */}
                  <div className="flex items-center gap-2 pt-4 border-t border-neutral-800">
                    <button 
                      onClick={() => navigate(`/app/builder/${item._id}`)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition cursor-pointer"
                    >
                      {t.edit}
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedResume(item);
                        setShowDeleteModal(true);
                      }} 
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs py-2 rounded-lg transition cursor-pointer"
                    >
                      {t.delete}
                    </button>
                    <button 
                      className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-xs py-2 rounded-lg transition cursor-pointer"
                    >
                      {t.download}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Kartu Tambah CV Cepat (Shortcut Card) */}
            <div
              onClick={OpenShowCreateResume}
              className="border-2 border-dashed border-neutral-800 hover:border-violet-500/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64 cursor-pointer transition-all group"
            >
              <div className="size-12 rounded-full bg-neutral-900 group-hover:bg-violet-600/20 text-white/60 group-hover:text-violet-400 flex items-center justify-center transition-all mb-3 text-xl font-bold">
                +
              </div>
              <p className="text-sm font-medium text-white">{t.createResume}</p>
              <p className="text-xs text-white/40 mt-1 max-w-50">{t.templateDescription}</p>
            </div>

          </div>
        </main>
      </div>

      {/* Dialog Pop-up Create Resume */}
      {showCreateResume && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateResume}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl relative"
          >
            <h2 className="text-xl font-bold text-white">{t.createResume}</h2>
            <p className="text-xs text-white/60">{t.resumeTitleDescription}</p>

            <input
              type="text"
              placeholder={t.resumePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              required
            />
            {errMsg && (
              <p className="text-red-500 text-sm mt-1">
                {errMsg}
              </p>
            )}
            <div className="flex items-center justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={CloseCreateResume}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition cursor-pointer"
              >
                {t.create}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* POP-UP Konfirmasi Delete Resume */}
      {showDeleteModal && selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </div>

            <h3 className="text-white text-lg font-semibold mb-2">{t.deleteResume}</h3>
            <p className="text-neutral-400 text-sm mb-6">
              {t.deleteMessage} <span className="text-white font-semibold">"{selectedResume.title}"</span>?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedResume(null);
                }}
                className="flex-1 py-2.5 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition text-sm font-medium cursor-pointer disabled:opacity-50"
              >
                Tidak
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDeleteResume}
                className="flex-1 py-2.5 rounded-full bg-red-600 text-white hover:bg-red-500 transition text-sm font-medium cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.deleting}
                  </>
                ) : (
                  t.yesSure
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DashboardView;