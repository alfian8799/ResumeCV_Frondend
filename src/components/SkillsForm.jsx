import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Wrench } from "lucide-react";

const SkillsForm = ({
  data = [],
  onChange
}) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (index) => {
    setExpandedItems((previous) => ({ ...previous, [index]: !previous[index] }));
  };

  // 1. Fungsi Tambah Kategori Skill
  const handleAddSkill = () => {
    const newSkill = {
      category: "",
      description: ""
    };
    onChange([...data, newSkill]);
  };

  // 2. Fungsi Edit Input
  const handleChangeItem = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };

  // 3. Fungsi Hapus Kategori Skill
  const handleDeleteSkill = (indexToRemove) => {
    const newData = data.filter((_, index) => index !== indexToRemove);
    onChange(newData);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Wrench className="size-5 text-violet-500" /> Skills
        </h3>
        <p className="text-xs text-neutral-500 mt-1">Kelompokkan keahlian Anda berdasarkan kategori (contoh: Hard Skills, Soft Skills, Tools).</p>
      </div>

      <div className="flex flex-col gap-6">
        {Array.isArray(data) && data.map((skillItem, index) => (
          <div key={index} className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl relative group">

            <div className="flex items-center justify-between gap-3 mb-4">
              <h4 className="text-sm font-semibold text-violet-400">Kategori Keahlian #{index + 1}</h4>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => handleDeleteSkill(index)} className="text-neutral-500 hover:text-red-500 transition-colors" title="Hapus Kategori">
                  <Trash2 className="size-4" />
                </button>
                <button type="button" onClick={() => toggleItem(index)} className="text-neutral-400 hover:text-white transition-colors" title={expandedItems[index] ? "Tutup Kategori" : "Buka Kategori"}>
                  {expandedItems[index] ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
                </button>
              </div>
            </div>

            {/* Form Input Grid */}
            {expandedItems[index] && <div className="grid grid-cols-1 gap-4">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-neutral-400">Kategori / Judul</label>
                <input
                  type="text"
                  value={skillItem.category || ""}
                  onChange={(e) => handleChangeItem(index, "category", e.target.value)}
                  placeholder="Entry Skill Category Hard Skills, Soft Skills, Software Proficiency"
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-medium text-neutral-400">Penjelasan (Pisahkan dengan koma)</label>
                <textarea
                  value={skillItem.description || ""}
                  onChange={(e) => handleChangeItem(index, "description", e.target.value)}
                  placeholder="Enter Your Skill Unity Engine, C# Programming, UI/UX Design, Problem Solving, Figma..."
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-24"
                ></textarea>
              </div>

            </div>}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddSkill}
        className="flex items-center justify-center gap-2 w-full py-3 mt-2 border border-dashed border-violet-500/50 text-violet-400 rounded-xl hover:bg-violet-600/10 hover:border-violet-500 transition-colors text-sm font-medium"
      >
        <Plus className="size-4" />
        Tambah Kategori Skill
      </button>

    </div>
  );
};

export default SkillsForm;