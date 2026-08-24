import { Plus, Trash2 } from "lucide-react";

const ExperienceForm = ({ 
  data = [], 
  onChange 
}) => {

  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: ""
    };
    onChange([...data, newExperience]);
  };

  // 2. Fungsi untuk mengubah nilai input
  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  // 3. Fungsi untuk menghapus pengalaman kerja
  const handleDeleteExperience = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white">Experience</h3>
        <p className="text-xs text-neutral-500 mt-1">Tambahkan riwayat pengalaman kerja atau magang Anda.</p>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((exp, index) => (
          <div key={index} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group">
            
            {/* Tombol Hapus */}
            <button 
              type="button" 
              onClick={() => handleDeleteExperience(index)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-red-500 transition-colors"
              title="Hapus Pengalaman"
            >
              <Trash2 className="size-4" />
            </button>

            <h4 className="text-sm font-semibold text-violet-400 mb-4">Pengalaman #{index + 1}</h4>

            {/* Form Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Posisi / Jabatan</label>
                <input
                  type="text"
                  value={exp.position || ""}
                  onChange={(e) => handleChangeItem(index, "position", e.target.value)}
                  placeholder="Entry Job Title"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Nama Perusahaan / Organisasi</label>
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => handleChangeItem(index, "company", e.target.value)}
                  placeholder="Enter Your Company Name"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

             

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Bulan & Tahun Mulai</label>
                <input
                  type="text"
                  value={exp.startDate || ""}
                  onChange={(e) => handleChangeItem(index, "startDate", e.target.value)}
                  placeholder="Entry Start Date"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Bulan & Tahun Selesai</label>
                <input
                  type="text"
                  value={exp.isCurrent ? "Sekarang" : (exp.endDate || "")}
                  onChange={(e) => handleChangeItem(index, "endDate", e.target.value)}
                  placeholder="Entry End Date"
                  disabled={exp.isCurrent}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                    exp.isCurrent 
                      ? "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed" 
                      : "bg-black border-neutral-800 text-white focus:border-violet-500"
                  }`}
                />
              </div>
              
               {/* Checkbox "Masih bekerja" diletakkan di atas tanggal agar alurnya enak */}
              <div className="flex items-center gap-1 md:col-span-2 bg-black p-1 rounded-lg">
                <input 
                  type="checkbox" 
                  id={`current-${index}`}
                  checked={exp.isCurrent || false}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    handleChangeItem(index, "isCurrent", isChecked);
                    // Jika dicentang, otomatis kosongkan endDate karena dianggap "Sekarang"
                    if (isChecked) {
                      handleChangeItem(index, "endDate", "");
                    }
                  }}
                  className="cursor-pointer size-4 accent-violet-600"
                />
                <label htmlFor={`current-${index}`} className="text-sm text-neutral-300 cursor-pointer select-none">
                  Saya saat ini masih bekerja
                </label>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2 mt-2">
                <label className="text-xs font-medium text-neutral-400">Deskripsi Pekerjaan</label>
                <textarea
                  value={exp.description || ""}
                  onChange={(e) => handleChangeItem(index, "description", e.target.value)}
                  placeholder="Describe your key responsibilities, daily tasks, or achievements while working in this position..."
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-32"
                ></textarea>
              </div>

            </div>
          </div>
        ))}
      </div>

      <button 
        type="button"
        onClick={handleAddExperience}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium"
      >
        <Plus className="size-4" />
        Tambah Pengalaman Kerja
      </button>

    </div>
  );
};

export default ExperienceForm;