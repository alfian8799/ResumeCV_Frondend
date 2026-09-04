import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, GraduationCap } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  // 1. Fungsi untuk menambah kolom pendidikan baru yang kosong
  const handleAddEducation = () => {
    const newEducation = {
      institutionName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      description: "",
    };
    onChange([...data, newEducation]);
  };

  // 2. Fungsi mengubah nilai input pada index pendidikan tertentu
  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  // 3. Fungsi menghapus pendidikan dari daftar
  const handleDeleteEducation = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <GraduationCap className="size-5 text-violet-500" /> Education
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Tambahkan riwayat pendidikan formal Anda.
        </p>
      </div>

      {/* Render item pendidikan (array) */}
      <div className="flex flex-col gap-6">
        {data.map((edu, index) => (
          <div
            key={index}
            className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group"
          >
            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-violet-400">
                Pendidikan #{index + 1}
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDeleteEducation(index)}
                  className="text-neutral-500 hover:text-red-500 transition-colors"
                  title="Hapus Pendidikan"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="text-neutral-400 hover:text-white transition-colors"
                  title={
                    expandedItems[index]
                      ? "Tutup Pendidikan"
                      : "Buka Pendidikan"
                  }
                >
                  {expandedItems[index] ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Form Input Grid */}
            {expandedItems[index] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-neutral-400">
                    Nama Institusi / Universitas
                  </label>
                  <input
                    type="text"
                    value={edu.institutionName || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "institutionName", e.target.value)
                    }
                    placeholder="Enter Your Institution Name"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-400">
                    Gelar
                  </label>
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "degree", e.target.value)
                    }
                    placeholder="Enter your degree"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-400">
                    Bidang Studi / Jurusan
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "fieldOfStudy", e.target.value)
                    }
                    placeholder="Enter your field of study"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-400">
                    Bulan & Tahun Mulai
                  </label>
                  <input
                    type="text"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "startDate", e.target.value)
                    }
                    placeholder="Enter Your Start Date"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-neutral-400">
                    Bulan & Tahun Lulus (Atau "Sekarang")
                  </label>
                  <input
                    type="text"
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "endDate", e.target.value)
                    }
                    placeholder="Enter Your End Date"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-neutral-400">
                    IPK / Nilai (Opsional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "gpa", e.target.value)
                    }
                    placeholder="Enter Your GPA / 4.00"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-xs font-medium text-neutral-400">
                    Deskripsi Singkat (Opsional)
                  </label>
                  <textarea
                    value={edu.description || ""}
                    onChange={(e) =>
                      handleChangeItem(index, "description", e.target.value)
                    }
                    placeholder="Enter your description of achievements and activities during study"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-24"
                  ></textarea>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tombol menambah form pendidikan baru */}
      <button
        type="button"
        onClick={handleAddEducation}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium"
      >
        <Plus className="size-4" />
        Tambah Pendidikan
      </button>
    </div>
  );
};

export default EducationForm;
