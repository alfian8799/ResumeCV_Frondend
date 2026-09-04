import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Briefcase } from "lucide-react";

const ExperienceForm = ({
  data = [],
  onChange
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((previous) => ({ ...previous, [index]: !previous[index] }));
  };

  const handleAddExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      companyDescription: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      isCurrent: false,
      responsibilities: ""
    };
    onChange([...data, newExperience]);
  };

  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  const handleDeleteExperience = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Briefcase className="size-5 text-violet-500" /> Experience
        </h3>
        <p className="text-xs text-neutral-500 mt-1">Tambahkan riwayat pengalaman kerja atau magang Anda.</p>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((exp, index) => (
          <div key={index} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group">

            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-violet-400">Pengalaman #{index + 1}</h4>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDeleteExperience(index)} className="text-neutral-500 hover:text-red-500 transition-colors cursor-pointer" title="Hapus Pengalaman">
                  <Trash2 className="size-4" />
                </button>
                <button type="button" onClick={() => toggleItem(index)} className="text-neutral-400 hover:text-white transition-colors" title={expandedItems[index] ? "Tutup Pengalaman" : "Buka Pengalaman"}>
                  {expandedItems[index] ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </button>
              </div>
            </div>

            {/* Form Input Grid */}
            {expandedItems[index] && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Nama Perusahaan & Jabatan (Sejajar) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Nama Perusahaan</label>
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => handleChangeItem(index, "company", e.target.value)}
                  placeholder="Enter company name, e.g. Kinobi"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Jabatan / Magang / Posisi</label>
                <input
                  type="text"
                  value={exp.position || ""}
                  onChange={(e) => handleChangeItem(index, "position", e.target.value)}
                  placeholder="Enter job/internship/role title"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Lokasi Perusahaan */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Lokasi Perusahaan (Kota, Negara)</label>
                <input
                  type="text"
                  value={exp.location || ""}
                  onChange={(e) => handleChangeItem(index, "location", e.target.value)}
                  placeholder="Enter company location, e.g. Singapore"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              {/* Deskripsi Perusahaan */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-medium text-neutral-400">Deskripsi Perusahaan (Opsional)</label>
                <textarea
                  value={exp.companyDescription || ""}
                  onChange={(e) => handleChangeItem(index, "companyDescription", e.target.value)}
                  placeholder="Enter company description, e.g. At Kinobi, we believe..."
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-20"
                ></textarea>
              </div>

              {/* Tanggal Mulai & Selesai (Bulan & Tahun Terpisah) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Tanggal Mulai (Bulan & Tahun)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.startMonth || ""}
                    onChange={(e) => handleChangeItem(index, "startMonth", e.target.value)}
                    placeholder="Bulan (Cth: Jan)"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                  <input
                    type="text"
                    value={exp.startYear || ""}
                    onChange={(e) => handleChangeItem(index, "startYear", e.target.value)}
                    placeholder="Tahun (Cth: 2023)"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Tanggal Selesai (Bulan & Tahun)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.isCurrent ? "Sekarang" : (exp.endMonth || "")}
                    onChange={(e) => handleChangeItem(index, "endMonth", e.target.value)}
                    placeholder="Bulan"
                    disabled={exp.isCurrent}
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${exp.isCurrent ? "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-black border-neutral-800 text-white focus:border-violet-500"}`}
                  />
                  <input
                    type="text"
                    value={exp.isCurrent ? "" : (exp.endYear || "")}
                    onChange={(e) => handleChangeItem(index, "endYear", e.target.value)}
                    placeholder="Tahun"
                    disabled={exp.isCurrent}
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors ${exp.isCurrent ? "bg-neutral-900 border-neutral-800 text-neutral-500 cursor-not-allowed" : "bg-black border-neutral-800 text-white focus:border-violet-500"}`}
                  />
                </div>
              </div>

              {/* Checkbox Bekerja di Sini */}
              <div className="flex items-center gap-2 md:col-span-2 bg-black p-1.5 rounded-lg mt-1">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={exp.isCurrent || false}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    handleChangeItem(index, "isCurrent", isChecked);
                    if (isChecked) {
                      handleChangeItem(index, "endMonth", "");
                      handleChangeItem(index, "endYear", "");
                    }
                  }}
                  className="cursor-pointer size-4 accent-violet-600"
                />
                <label htmlFor={`current-${index}`} className="text-sm text-neutral-300 cursor-pointer select-none">
                  Saat ini saya bekerja di sini
                </label>
              </div>

              {/* Tanggung Jawab dan Prestasi (Textarea dengan panduan poin) */}
              <div className="flex flex-col gap-1.5 md:col-span-2 mt-2">
                <label className="text-xs font-medium text-neutral-400">Tanggung Jawab dan Prestasi</label>
                <textarea
                  value={exp.responsibilities || ""}
                  onChange={(e) => handleChangeItem(index, "responsibilities", e.target.value)}
                  onKeyDown={(e) => {
                    // Jika menekan tombol Enter, otomatis tambahkan bullet "• " di baris baru
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const target = e.target;
                      const start = target.selectionStart;
                      const end = target.selectionEnd;
                      const value = target.value;

                      // Masukkan karakter newline diikuti bullet point
                      const newValue = value.substring(0, start) + "\n• " + value.substring(end);
                      handleChangeItem(index, "responsibilities", newValue);

                      // Kembalikan posisi kursor setelah titik poin baru
                      setTimeout(() => {
                        target.selectionStart = target.selectionEnd = start + 3;
                      }, 0);
                    }
                  }}
                  placeholder="• Masukkan tanggung jawab atau prestasi Anda di sini..."
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-32"
                ></textarea>
                <p className="text-[11px] text-neutral-500 italic">
                  Tekan Enter untuk membuat poin baru secara otomatis (•). Akhiri setiap kalimat dengan titik (.).
                </p>
              </div>

            </div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddExperience}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium cursor-pointer"
      >
        <Plus className="size-4" />
        Tambah Pengalaman Kerja
      </button>

    </div>
  );
};

export default ExperienceForm;