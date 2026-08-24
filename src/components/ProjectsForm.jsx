import { Plus, Trash2 } from "lucide-react"; // Pastikan lucide-react ter-install

const ProjectsForm = ({ 
  data = [], 
  onChange 
}) => {

  // 1. FUNGSI TAMBAH (Add): Menambahkan form proyek kosong baru saat tombol diklik
  const handleAddProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  // 2. FUNGSI EDIT (Update): Mengubah isi dari form yang sedang diketik
  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  // 3. FUNGSI HAPUS (Delete): Menghapus proyek berdasarkan urutannya
  const handleDeleteProject = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white">Projects</h3>
        <p className="text-xs text-neutral-500 mt-1">Tambahkan proyek portofolio, tugas akhir, atau karya terbaik Anda.</p>
      </div>

      {/* Render daftar proyek yang sudah ditambahkan */}
      <div className="flex flex-col gap-6">
        {data.map((proj, index) => (
          <div key={index} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group">
            
            {/* Tombol Hapus Proyek */}
            <button 
              type="button" 
              onClick={() => handleDeleteProject(index)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-red-500 transition-colors"
              title="Hapus Proyek"
            >
              <Trash2 className="size-4" />
            </button>

            <h4 className="text-sm font-semibold text-violet-400 mb-4">Proyek #{index + 1}</h4>

            {/* Form Input Isian Proyek */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Nama Proyek</label>
                <input
                  type="text"
                  value={proj.name || ""}
                  onChange={(e) => handleChangeItem(index, "name", e.target.value)}
                  placeholder="Enter Your Project Name"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Tipe / Kategori Proyek</label>
                <input
                  type="text"
                  value={proj.type || ""}
                  onChange={(e) => handleChangeItem(index, "type", e.target.value)}
                  placeholder="Enter Your Project Type"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2 mt-2">
                <label className="text-xs font-medium text-neutral-400">Deskripsi Proyek</label>
                <textarea
                  value={proj.description || ""}
                  onChange={(e) => handleChangeItem(index, "description", e.target.value)}
                  placeholder="Describe this project, the technologies used, and your role or contribution..."
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-32"
                ></textarea>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Tombol Tambah Proyek Baru */}
      <button 
        type="button"
        onClick={handleAddProject}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium"
      >
        <Plus className="size-4" />
        Tambah Proyek
      </button>

    </div>
  );
};

export default ProjectsForm;