import { Type, Sliders, Palette, AlignLeft, ArrowDown, ArrowUp, LayoutList, MoveVertical, Eye, EyeOff } from "lucide-react";

const sectionLabels = {
  experience: "Experience",
  education: "Education",
  projects: "Projects",
  skills: "Skills",
  achievements: "Achievements",
};

const defaultSectionOrder = Object.keys(sectionLabels);
const defaultSectionLayouts = {};

const SettingForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleVisibility = () => {
    onChange({
      ...data,
      public: !data.public
    });
  };

  const layout = data.layout || {};
  const sectionOrder = [
    ...(layout.sectionOrder || []),
    ...defaultSectionOrder.filter((section) => !(layout.sectionOrder || []).includes(section)),
  ];
  const sectionLayouts = layout.sectionLayouts || defaultSectionLayouts;

  const moveSection = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= sectionOrder.length) return;

    const nextOrder = [...sectionOrder];
    [nextOrder[index], nextOrder[nextIndex]] = [nextOrder[nextIndex], nextOrder[index]];
    onChange({ layout: { sectionOrder: nextOrder, sectionLayouts } });
  };

  const updateSectionLayout = (section, value) => {
    onChange({
      layout: {
        sectionOrder,
        sectionLayouts: { ...sectionLayouts, [section]: value },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sliders className="size-5 text-violet-500" /> Resume Settings
        </h3>
        <p className="text-sm text-neutral-400">Pengaturan tambahan untuk sepasi, font, ukuran, dan lainnya.</p>

      </div>

      <div className="flex items-center justify-between sm:justify-between gap-4 bg-black border border-neutral-800 rounded-xl px-4 py-3 mb-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">Visibility</span>
          <span className="text-xs text-neutral-400">Atur visibilitas resume Anda</span>
        </div>

        <button
          type="button"
          onClick={handleVisibility}
          className="bg-purple-600 hover:bg-purple-700 text-white transition-all rounded-xl px-5 py-2.5 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer w-fit shadow-sm"
        >
          {data.public ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
          {data.public ? "Public" : "Private"}
        </button>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Pilihan Font */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
            <Type className="size-3.5 text-violet-400" /> Font Family
          </label>
          <select
            value={data.fontFamily || "Arial"}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
          >
            <option value="Arial">Arial</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>

        {/* Ukuran Teks (Small, Medium, Large) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">Ukuran Teks</label>
          <select
            value={data.textSize || "Medium"}
            onChange={(e) => handleChange("textSize", e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        {/* Jarak Baris */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
            <MoveVertical className="size-3.5 text-violet-400" /> Jarak Baris
          </label>
          <select
            value={data.lineSpacing || "normal"}
            onChange={(e) => handleChange("lineSpacing", e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
          >
            <option value="tight">Rapat</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Lebih renggang</option>
          </select>
        </div>

        {/* Perataan Teks (Left atau Justify) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
            <AlignLeft className="size-3.5 text-violet-400" /> Perataan Paragraf
          </label>
          <select
            value={data.textAlign || "left"}
            onChange={(e) => handleChange("textAlign", e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
          >
            <option value="left">Left (Kiri)</option>
            <option value="justify">Justify (Rata Kanan-Kiri)</option>
          </select>
        </div>

        {/* Warna Header dan Baris */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5">
            <Palette className="size-3.5 text-violet-400" /> Warna Header dan Baris
          </label>
          <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-xl px-4 py-2.5">
            <input
              type="color"
              value={data.accentColor || "#8b5cf6"}
              onChange={(e) => handleChange("accentColor", e.target.value)}
              className="size-8 bg-transparent rounded cursor-pointer border-0"
            />
            <span className="text-sm text-white font-mono uppercase">{data.accentColor || "#8b5cf6"}</span>
          </div>
        </div>

        <div className="md:col-span-2 border-t border-neutral-800 pt-5 mt-1">
          <label className="text-xs font-medium text-neutral-400 flex items-center gap-1.5 mb-3">
            <LayoutList className="size-3.5 text-violet-400" /> Tata Letak Bagian CV
          </label>
          <div className="flex flex-col gap-2">
            {sectionOrder.map((section, index) => (
              <div key={section} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-black border border-neutral-800 rounded-xl p-2.5">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs text-neutral-500 w-5 text-center">{index + 1}</span>
                  <span className="text-sm text-white truncate">{sectionLabels[section]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    title={`Naikkan ${sectionLabels[section]}`}
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowUp className="size-4" />
                  </button>
                  <button
                    type="button"
                    title={`Turunkan ${sectionLabels[section]}`}
                    onClick={() => moveSection(index, 1)}
                    disabled={index === sectionOrder.length - 1}
                    className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowDown className="size-4" />
                  </button>
                </div>
                <select
                  value={sectionLayouts[section] || "standard"}
                  onChange={(event) => updateSectionLayout(section, event.target.value)}
                  className="sm:w-36 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                >
                  <option value="standard">Standard</option>
                  <option value="two-column">2 kolom</option>
                  <option value="compact">Compact</option>
                </select>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingForm;