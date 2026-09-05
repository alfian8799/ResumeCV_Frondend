import Title from './Title.jsx';
import { useLanguage } from '../languageContext.js';
const Testimoni = () => {
    const { language } = useLanguage();
    const indonesianDescriptions = [
        "VinzCV benar-benar mengubah cara saya membuat resume. Templatenya rapi, profesional, dan ramah ATS!",
        "Saya bisa membuat resume profesional dalam hitungan menit dan langsung menyesuaikannya dengan posisi yang saya incar.",
        "VinzCV membuat penyusunan resume menjadi lebih mudah dengan struktur yang jelas dan pilihan template yang fleksibel.",
        "Formulirnya membantu saya menyusun pengalaman dan pendidikan dengan rapi. Hasil akhirnya terlihat sangat profesional.",
        "Pratinjau real-time membuat saya bisa melihat setiap perubahan resume tanpa harus membuka halaman lain.",
        "Fitur ekspor PDF VinzCV sangat praktis. Resume saya siap dikirim untuk melamar pekerjaan kapan saja.",
        "VinzCV membantu saya menonjolkan keahlian dan pencapaian dengan format resume yang terstruktur.",
        "Saya menghemat banyak waktu karena tidak perlu mendesain resume dari awal. Semua bagian sudah mudah diatur.",
        "Dengan VinzCV, saya bisa menyimpan dan memperbarui beberapa resume untuk posisi pekerjaan yang berbeda."
    ];

    const testimonials = [
        { id: 1, description: "VinzCV completely changed how I create my resume. The templates are clean, professional, and ATS-friendly!", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", name: "Budi Santoso", role: { id: "Software Engineer", en: "Software Engineer" } },
        { id: 2, description: "I created a professional resume in minutes and tailored it directly to the role I was applying for.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", name: "Siti Rahma", role: { id: "Marketing Specialist", en: "Marketing Specialist" } },
        { id: 3, description: "VinzCV makes resume building easier with a clear structure and flexible template options.", image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60", name: "Andi Wijaya", role: { id: "UI/UX Designer", en: "UI/UX Designer" } },
        { id: 4, description: "The forms helped me organize my experience and education clearly. The final resume looks very professional.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop", name: "Dewi Lestari", role: { id: "Guru", en: "Teacher" } },
        { id: 5, description: "The real-time preview lets me see every resume change without opening another page.", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60", name: "Rizky Pratama", role: { id: "Data Analyst", en: "Data Analyst" } },
        { id: 6, description: "VinzCV's PDF export is incredibly practical. My resume is ready to send with every application.", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", name: "Nabila Putri", role: { id: "Content Writer", en: "Content Writer" } },
        { id: 7, description: "VinzCV helped me highlight my skills and achievements in a structured resume format.", image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png", name: "Fajar Hidayat", role: { id: "Project Manager", en: "Project Manager" } },
        { id: 8, description: "I saved a lot of time because I did not have to design my resume from scratch. Every section is easy to edit.", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200", name: "Maya Anggraini", role: { id: "HR Specialist", en: "HR Specialist" } },
        { id: 9, description: "With VinzCV, I can save and update multiple resumes for different job applications.", image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", name: "Gilang Saputra", role: { id: "Business Analyst", en: "Business Analyst" } }
    ]

    const columns = [
        { start: 0, end: 3, className: "animate-scroll-up-1" },
        { start: 3, end: 6, className: "hidden md:block animate-scroll-up-2" },
        { start: 6, end: 9, className: "hidden lg:block animate-scroll-up-3" }
    ]

    const renderCard = (testimonial, index) => (
        <div key={`${testimonial.id}-${index}`} className="bg-linear-to-b from-[#020204] to-[#191130] border border-slate-800 rounded-xl p-6 mb-4 hover:border-slate-700 transition-all duration-300">
            <div className="mb-5">
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z" /></g>
                </svg>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
                {language === 'id' ? indonesianDescriptions[testimonial.id - 1] : testimonial.description}
            </p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="size-9 rounded-full border border-slate-800" />
                <div>
                    <p className="text-sm text-slate-300">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role[language]}</p>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div id="testimoni">
                <Title
                    badge={language === 'id' ? 'Testimoni' : 'Testimonials'}
                    title={language === 'id' ? 'Disukai Para Pencari Kerja' : 'Loved by Job Seekers'}
                    description={language === 'id' ? 'Lihat bagaimana VinzCV membantu ribuan profesional mendapatkan pekerjaan impian.' : 'See how VinzCV has helped thousands of professionals land their dream jobs.'}
                />

                <style>
                    {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll-up {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(-50%);
                        }
                    }
                    .animate-scroll-up-1 {
                        animation: scroll-up 25s linear infinite;
                    }
                    .animate-scroll-up-2 {
                        animation: scroll-up 30s linear infinite;
                    }
                    .animate-scroll-up-3 {
                        animation: scroll-up 20s linear infinite; 
                    }
                `}
                </style>

                <div className="bg-black flex flex-col items-center justify-center py-10 pb-60 px-4" >
                    <div className="relative w-full max-w-6xl overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-150 overflow-hidden">
                            {columns.map((col, colIndex) => (
                                <div key={colIndex} className={col.className}>
                                    {[...testimonials.slice(col.start, col.end), ...testimonials.slice(col.start, col.end)].map((testimonial, index) =>
                                        renderCard(testimonial, index)
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Testimoni
