import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Award } from "lucide-react";


const AchievementsForm = ({
  data = [],
  onChange
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((previous) => ({ ...previous, [index]: !previous[index] }));
  };

  // 1. Fungsi untuk menambah kolom pencapaian baru
  const handleAddAchievement = () => {
    const newAchievement = {
      title: "",
      issuer: "",
      date: "",
      description: ""
    };
    onChange([...data, newAchievement]);
  };

  // 2. Fungsi untuk mengubah nilai input
  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  // 3. Fungsi untuk menghapus pencapaian
  const handleDeleteAchievement = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Award className="size-5 text-violet-500" /> Achievements
        </h3>
        <p className="text-xs text-neutral-500 mt-1">Tambahkan penghargaan, sertifikasi kompetensi, atau pencapaian profesional Anda.</p>
      </div>
      <div className="flex flex-col gap-6">
        {data.map((achieve, index) => (
          <div key={index} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group">

            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-violet-400">Pencapaian #{index + 1}</h4>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDeleteAchievement(index)} className="text-neutral-500 hover:text-red-500 transition-colors" title="Hapus Pencapaian">
                  <Trash2 className="size-4" />
                </button>
                <button type="button" onClick={() => toggleItem(index)} className="text-neutral-400 hover:text-white transition-colors" title={expandedItems[index] ? "Tutup Pencapaian" : "Buka Pencapaian"}>
                  {expandedItems[index] ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </button>
              </div>
            </div>

            {/* Form Input Grid */}
            {expandedItems[index] && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Nama Sertifikasi / Penghargaan</label>
                <input
                  type="text"
                  value={achieve.title || ""}
                  onChange={(e) => handleChangeItem(index, "title", e.target.value)}
                  placeholder="Enter Your Title"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Penyelenggara / Penerbit (Issuer)</label>
                <input
                  type="text"
                  value={achieve.issuer || ""}
                  onChange={(e) => handleChangeItem(index, "issuer", e.target.value)}
                  placeholder="Enter Your Issuer"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Bulan & Tahun (Date)</label>
                <input
                  type="text"
                  value={achieve.date || ""}
                  onChange={(e) => handleChangeItem(index, "date", e.target.value)}
                  placeholder="Enter Your Date"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2 mt-2">
                <label className="text-xs font-medium text-neutral-400">Penjelasan (Opsional)</label>
                <textarea
                  value={achieve.description || ""}
                  onChange={(e) => handleChangeItem(index, "description", e.target.value)}
                  placeholder="Enter Your Description"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-24"
                ></textarea>
              </div>

            </div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddAchievement}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium"
      >
        <Plus className="size-4" />
        Tambah Pencapaian
      </button>

    </div>
  );
};

export default AchievementsForm;