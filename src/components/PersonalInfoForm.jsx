import { User } from "lucide-react"; // Pastikan Anda sudah menginstal lucide-react (npm install lucide-react)

const PersonalInfoForm = ({
  data = {},
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white">Personal Info</h3>
        <p className="text-xs text-neutral-500 mt-1">
          Masukkan informasi dasar dan kontak Anda di sini.
        </p>
      </div>

      {/* BAGIAN UPLOAD GAMBAR */}
      <div>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            {data.image ? (
              <img
                src={
                  typeof data.image === "string"
                    ? data.image
                    : URL.createObjectURL(data.image)
                }
                alt="Profile"
                className="size-20 rounded-full object-cover border-2 border-neutral-700"
              />
            ) : (
              <div className="inline-flex flex-col items-center justify-center gap-1 mt-2 text-neutral-500 hover:text-white transition cursor-pointer">
                <div className="p-4 border border-neutral-700 rounded-full bg-neutral-900">
                  <User className="size-8" />
                </div>
                <span className="text-xs mt-1">Upload Image</span>
              </div>
            )}
            <imp
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </label>

          {/* REMOVE BACKGROUND */}
          {data.image && data.image !== "Default Image" && (
            <div className="flex flex-col gap-2 pl-4 text-sm border-l border-neutral-800">
              <p className="text-neutral-400 font-medium">Remove Background</p>
              <label className="relative inline-flex cursor-pointer items-center gap-3 text-white">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={removeBackground}
                  onChange={() => setRemoveBackground((prev) => !prev)}
                />
                <div className="peer h-6 w-11 rounded-full bg-neutral-700 ring-offset-1 transition-colors duration-200 peer-checked:bg-violet-600 peer-focus:ring-2 peer-focus:ring-violet-500"></div>
                <span className="dot absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout untuk membagi form menjadi 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Nama Lengkap
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={
              data["fullName"] === "Default Name" ? "" : data?.fullName || ""
            }
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="Enter Full Name"
            required
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Job Title */}
        {/* Job Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Posisi / Pekerjaan
          </label>
          <input
            type="text"
            value={
              data?.jobTitle === "Default Job Title" ? "" : data?.jobTitle || ""
            }
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Enter Your Job Title"
            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-neutral-400">
            Email
            <span className="text-red-500">*</span>
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
            type="telephone"
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
            value={
              data?.linkedin === "Default Linkedin" ? "" : data?.linkedin || ""
            }
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
            value={
              data?.portfolioUrl === "Default Portfolio"
                ? ""
                : data?.portfolioUrl || ""
            }
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
