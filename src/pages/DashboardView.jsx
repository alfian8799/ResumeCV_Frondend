import { useState } from "react";

const DashboardView = () => {
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");

  const handleCreateResume = async (e) => {
    e.preventDefault();
    console.log(title);
    setShowCreateResume(false);
    setTitle(""); // Reset input setelah submit
  };

  // OPEN 
  const OpenShowCreateResume = () => {
    setShowCreateResume(true);
  };

  // CLOSE
  const CloseCreateResume = () => {
    setShowCreateResume(false);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col pt-20">
        {/* Konten Utama Dashboard */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Bagian Sambutan & Tombol Buat CV Baru */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Resumes</h1>
              <p className="text-white/60 text-sm mt-1">Manage, edit, or create new professional CVs easily.</p>
            </div>
          </div>

          {/* Grid Daftar CV / Kosong (Placeholder) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Contoh Kartu CV Pertama (Template Aktif) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between h-64 hover:border-violet-500/50 transition-all group">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full font-medium">ATS-Friendly</span>
                  <span className="text-xs text-white/40">Updated 2 days ago</span>
                </div>
                <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-violet-400 transition-colors">Software Engineer CV</h3>
                <p className="text-xs text-white/50 mt-1">Target Role: Fullstack Developer</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-neutral-800">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded-lg transition cursor-pointer">Edit</button>
                <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-xs py-2 rounded-lg transition cursor-pointer">Download PDF</button>
              </div>
            </div>

            {/* Kartu Tambah CV Cepat (Shortcut Card) - Dipasangkan onClick */}
            <div 
              onClick={OpenShowCreateResume}
              className="border-2 border-dashed border-neutral-800 hover:border-violet-500/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64 cursor-pointer transition-all group"
            >
              <div className="size-12 rounded-full bg-neutral-900 group-hover:bg-violet-600/20 text-white/60 group-hover:text-violet-400 flex items-center justify-center transition-all mb-3 text-xl font-bold">
                +
              </div>
              <p className="text-sm font-medium text-white">Create New Resume</p>
              <p className="text-xs text-white/40 mt-1 max-w-50">Choose from our professional templates.</p>
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
            <h2 className="text-xl font-bold text-white">Create New Resume</h2>
            <p className="text-xs text-white/60">Give your resume a title or target role to get started.</p>
            
            <input 
              type="text" 
              placeholder="e.g. Frontend Developer CV" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
              required 
            />

            <div className="flex items-center justify-end gap-3 mt-4">
              <button 
                type="button" 
                onClick={CloseCreateResume}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-xl text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white transition cursor-pointer"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default DashboardView;