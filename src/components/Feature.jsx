import Title from "./Title"; // Sesuaikan path import jika lokasinya berbeda
import { useLanguage } from "../languageContext.js";
import { Download, FilePenLine, LayoutTemplate } from "lucide-react";

const Feature = () => {
  const { language } = useLanguage();
  const features =
    language === "id"
      ? [
          {
            title: "Input Form Praktis",
            description:
              "Isi detail Anda melalui formulir yang intuitif dan terstruktur.",
            icon: FilePenLine,
            hasTrending: true,
            imageClass: "max-w-56",
          },
          {
            title: "Pratinjau Real-time",
            description:
              "Pantau setiap perubahan desain CV secara langsung tanpa memuat ulang.",
            icon: LayoutTemplate,
            hasTrending: false,
          },
          {
            title: "Ekspor PDF & Simpan",
            description:
              "Amankan progres dan unduh CV final dalam format PDF siap digunakan.",
            icon: Download,
            hasTrending: false,
            imageClass: "max-w-60",
          },
        ]
      : [
          {
            title: "Practical Form Input",
            description:
              "Fill in your details through an intuitive and structured form.",
            icon: FilePenLine,
            hasTrending: true,
            imageClass: "max-w-56",
          },
          {
            title: "Real-time Preview",
            description:
              "Monitor every design change to your CV instantly without reloading.",
            icon: LayoutTemplate,
            hasTrending: false,
          },
          {
            title: "Export PDF & Save",
            description:
              "Secure your progress and download the final CV in a ready-to-use PDF format.",
            icon: Download,
            hasTrending: false,
            imageClass: "max-w-60",
          },
        ];

  return (
    <>
      <style>
        {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                `}
      </style>

      <section className="bg-black py-24 pb-64 px-4" id="features">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          {/* Memanggil Komponen Title yang sudah disesuaikan temanya */}
          <Title
            badge={language === "id" ? "Fitur Utama" : "Core Features"}
            title={
              language === "id"
                ? "Bangun Karier Lebih Cepat"
                : "Build Your Career Faster"
            }
            description={
              language === "id"
                ? "Alat pintar kami membantu Anda membuat resume unggulan dengan mudah."
                : "Our smart tools help you create a standout resume without reinventing the wheel."
            }
          />

          {/* Grid Cards Features */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black border border-neutral-800 rounded-2xl hover:-translate-y-3 transition duration-300 p-6 flex flex-col"
              >
                <div
                  className={`flex-1 flex items-center justify-center ${feature.imageContainerClass || ""}`}
                >
                  <div className="size-28 rounded-3xl border border-white/20 bg-white/5 text-white flex items-center justify-center shadow-[0_0_45px_rgba(255,255,255,0.08)]">
                    <feature.icon
                      className="size-14"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <h3 className="text-base font-medium text-white mt-8 text-left">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-400 mt-2 text-left max-w-2xs mb-4">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
