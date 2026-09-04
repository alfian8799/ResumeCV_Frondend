import { useRef, useState } from "react";
import { User, Upload, Trash2, Wand2} from "lucide-react";
import { removeBackground as removeImageBackground } from "@imgly/background-removal";

// 1. Daftar warna background
const BACKGROUND_COLORS = {
  transparent: "rgba(0,0,0,0)",
  white: "#ffffff",
  red: "#dc2626",
  blue: "#2563eb",
};

// 2. Fungsi untuk menggabungkan warna dengan foto yang sudah transparan
const createColoredImage = (imageBlob, color) =>
  new Promise((resolve, reject) => {
    if (color === "rgba(0,0,0,0)") {
      return resolve(imageBlob); // Jika transparan, langsung kembalikan gambar asli
    }

    const image = new Image();
    const imageUrl = URL.createObjectURL(imageBlob);

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");

      // Warnai background
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Tempelkan foto di atas warna
      context.drawImage(image, 0, 0);

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(imageUrl);
        if (!blob) {
          reject(new Error("Gagal membuat gambar"));
          return;
        }
        resolve(blob);
      }, "image/jpeg", 0.9); // Gunakan JPEG untuk background solid
    };

    image.onerror = reject;
    image.src = imageUrl;
  });

const PersonalInfoForm = ({ data = {}, onChange }) => {
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);
  const [isBgRemoved, setIsBgRemoved] = useState(false);

  // State untuk menyimpan foto mentah tanpa background dan warna saat ini
  const [transparentBlob, setTransparentBlob] = useState(null);
  const [bgColor, setBgColor] = useState("transparent");

  const updateData = (changes) => {
    onChange({
      ...data,
      ...changes,
    });
  };

  const handleChange = (field, value) => {
    updateData({ [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const previewUrl = URL.createObjectURL(file);

    updateData({
      image: file,
      originalImage: file,
      imagePreview: previewUrl,
    });

    // Reset status penghapusan background jika upload ulang
    setIsBgRemoved(false);
    setTransparentBlob(null);
    setBgColor("transparent");
    event.target.value = "";
  };

  const handleRemoveBackground = async (checked) => {
    const originalImage = data.originalImage || data.image;

    if (!(originalImage instanceof File)) {
      setIsBgRemoved(false);
      alert("Silakan upload foto terlebih dahulu.");
      return;
    }

    // Jika checkbox dimatikan, kembalikan ke foto asli
    if (!checked) {
      updateData({
        image: originalImage,
        imagePreview: URL.createObjectURL(originalImage),
      });
      setIsBgRemoved(false);
      setTransparentBlob(null);
      setBgColor("transparent");
      return;
    }

    try {
      setProcessing(true);
      setIsBgRemoved(true);

      // Proses hapus background dengan AI
      const resultBlob = await removeImageBackground(originalImage);

      // Simpan hasil transparan ke state lokal
      setTransparentBlob(resultBlob);
      setBgColor("transparent");

      const processedFile = new File(
        [resultBlob],
        `profile-${Date.now()}.png`,
        { type: "image/png" }
      );

      updateData({
        image: processedFile,
        imagePreview: URL.createObjectURL(processedFile),
      });
    } catch (error) {
      console.error("Gagal menghapus background:", error);
      setIsBgRemoved(false);
      alert("Background foto gagal dihapus.");
    } finally {
      setProcessing(false);
    }
  };

  // Fungsi mengubah warna background dari Select
  const handleBackgroundColorChange = async (selectedColorKey) => {
    setBgColor(selectedColorKey);
    if (!transparentBlob) return;

    try {
      const coloredBlob = await createColoredImage(transparentBlob, BACKGROUND_COLORS[selectedColorKey]);

      const ext = selectedColorKey === "transparent" ? "png" : "jpg";
      const mimeType = selectedColorKey === "transparent" ? "image/png" : "image/jpeg";

      const processedFile = new File(
        [coloredBlob],
        `profile-bg-${Date.now()}.${ext}`,
        { type: mimeType }
      );

      updateData({
        image: processedFile,
        imagePreview: URL.createObjectURL(processedFile),
      });
    } catch (error) {
      console.error("Gagal mengubah warna background:", error);
    }
  };

  const handleDeleteImage = () => {
    updateData({
      image: "",
      originalImage: "",
      imagePreview: "",
      imageId: "",
    });
    setIsBgRemoved(false);
    setTransparentBlob(null);
    setBgColor("transparent");
  };

  const imageSource = data.imagePreview || (typeof data.image === "string" ? data.image : "");

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header Section */}
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <User className="size-5 text-violet-500" /> Personal Info
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Masukkan informasi dasar dan kontak Anda di sini.
        </p>
      </div>
      {/* Image Upload Section */}
      <div className="flex items-start gap-4">
        <label className="cursor-pointer shrink-0">
          {imageSource ? (
            <img
              src={imageSource}
              alt="Profile"
              className="size-20 rounded-full object-cover border-2 border-neutral-700 bg-neutral-800"
            />
          ) : (
            <div className="inline-flex flex-col items-center justify-center gap-1 text-neutral-500 mt-1">
              <div className="p-4 border border-neutral-700 rounded-full bg-neutral-900 hover:text-white transition">
                <User className="size-8" />
              </div>
              <span className="text-xs">Upload Image</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {imageSource && (
          <div className="flex flex-col gap-3 pl-4 text-sm border-l border-neutral-800 w-full py-1">
            <button
              type="button"
              onClick={handleDeleteImage}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 w-fit transition"
            >
              <Trash2 className="size-4" />
              Hapus Foto
            </button>

            <label className="flex items-center gap-2 text-neutral-300 cursor-pointer hover:text-white transition w-fit">
              <input
                type="checkbox"
                checked={isBgRemoved}
                disabled={processing || !(data.image instanceof File)}
                onChange={(event) => handleRemoveBackground(event.target.checked)}
                className="cursor-pointer accent-violet-500"
              />
              <Wand2 className="size-4" />
              {processing ? "Memproses..." : "Hapus Background"}
            </label>

            {/* Pilihan Warna Background - Tampil hanya jika background dihapus */}
            {isBgRemoved && transparentBlob && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-neutral-400">Warna Background:</span>
                <select
                  value={bgColor}
                  disabled={processing}
                  onChange={(event) => handleBackgroundColorChange(event.target.value)}
                  className="rounded-lg bg-neutral-900 border border-neutral-700 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  <option value="transparent">Transparan</option>
                  <option value="white">Putih</option>
                  <option value="red">Merah</option>
                  <option value="blue">Biru</option>
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 w-fit transition"
            >
              <Upload className="size-4" />
              Ganti Foto
            </button>
          </div>
        )}
      </div>

      {/* Grid Inputs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data?.fullName === "Default Name" ? "" : data?.fullName || ""}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter Full Name"
            required
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Job Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Posisi / Pekerjaan
          </label>
          <input
            type="text"
            value={data?.jobTitle === "Default Job Title" ? "" : data?.jobTitle || ""}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Enter Your Job Title"
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data?.email === "Default Email" ? "" : data?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter Your Email"
            required
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Nomor Telepon
          </label>
          <input
            type="tel"
            value={data?.phone === "Default Phone" ? "" : data?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter Your Phone Number"
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* LinkedIn */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            URL LinkedIn
          </label>
          <input
            type="url"
            value={data?.linkedin === "Default Linkedin" ? "" : data?.linkedin || ""}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="Enter Your LinkedIn Profile"
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            URL Portfolio / Website
          </label>
          <input
            type="url"
            value={data?.portfolioUrl === "Default Portfolio" ? "" : data?.portfolioUrl || ""}
            onChange={(e) => handleChange("portfolioUrl", e.target.value)}
            placeholder="Enter Your Portfolio URL"
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5 mt-2">
        <label className="text-xs font-medium text-neutral-400">Alamat</label>
        <textarea
          value={data?.address === "Default Address" ? "" : data?.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Enter Your Address"
          className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-24"
        ></textarea>
      </div>
    </div>
  );
};

export default PersonalInfoForm;