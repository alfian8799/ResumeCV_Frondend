import { Type, Sliders, Palette, AlignLeft } from "lucide-react";

const SettingForm = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sliders className="size-5 text-violet-500" /> Resume Settings
        </h3>
        <p className="text-xs text-neutral-500 mt-1">Perubahan akan langsung diterapkan secara instan pada pratinjau resume.</p>
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

        {/* Ukuran Spasi / Font Size Angka (Minimal 12) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">Ukuran Spasi / Font Dasar (px)</label>
          <input
            type="number"
            value={data.fontSizeNum || 14}
            onChange={(e) => handleChange("fontSizeNum", Math.max(12, Number(e.target.value)))}
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
            min="12"
            max="30"
          />
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

      </div>
    </div>
  );
};

export default SettingForm;