import { Mail, Phone, MapPin, Link, ExternalLink } from 'lucide-react';

const Template2 = ({ data, accentColor = "#2563eb" }) => {
    // Mengantisipasi perbedaan penamaan properti (exprience vs experiences)
    const experienceList = data.experiences || data.exprience || [];

    return (
        // Container utama agar berada di tengah dan responsif
        <div className="w-full flex justify-center bg-neutral-100 p-4 md:p-8">

            {/* Kertas Resume (ukuran A4 proporsional) */}
            <div
                id="preview-resume-2"
                className="w-full max-w-[210mm] min-h-[297mm] bg-white text-gray-800 shadow-xl print:shadow-none print:m-0"
            >
                <div className="p-8 md:p-12 leading-relaxed">

                    {/* ================= 1. HEADER (Foto, Nama, & Kontak Model Template 2) ================= */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 border-b-2 pb-6" style={{ borderColor: accentColor }}>
                        
                        {/* Foto Profil (Opsional jika ada) */}
                        {data.personalInfo?.photo && (
                            <img 
                                src={data.personalInfo.photo} 
                                alt="Profile" 
                                className="w-24 h-28 object-cover rounded-md shadow-sm border border-gray-200" 
                            />
                        )}

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1" style={{ color: accentColor }}>
                                {data.personalInfo?.fullName || "Nama Lengkap Anda"}
                            </h1>
                            
                            {data.personalInfo?.jobTitle && (
                                <h2 className="text-lg font-medium text-gray-600 mb-3">
                                    {data.personalInfo.jobTitle}
                                </h2>
                            )}

                            {/* Kontak Info Berderet Horizontal */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-700">
                                {data.personalInfo?.email && (
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <span>{data.personalInfo.email}</span>
                                    </div>
                                )}
                                {data.personalInfo?.phone && (
                                    <div className="flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <span>{data.personalInfo.phone}</span>
                                    </div>
                                )}
                                {data.personalInfo?.address && (
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <span>{data.personalInfo.address}</span>
                                    </div>
                                )}
                                {data.personalInfo?.portfolioUrl && (
                                    <div className="flex items-center gap-1.5">
                                        <ExternalLink className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <a href={data.personalInfo.portfolioUrl} target="_blank" rel="noreferrer" className="hover:underline">
                                            {data.personalInfo.portfolioUrl}
                                        </a>
                                    </div>
                                )}
                                {data.personalInfo?.linkedin && (
                                    <div className="flex items-center gap-1.5">
                                        <Link className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <a href={data.personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                                            {data.personalInfo.linkedin}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ================= 2. SUMMARY (Ringkasan) ================= */}
                    {data.summary && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Summary
                            </h3>
                            <p className="text-sm text-gray-700 whitespace-pre-line text-justify">
                                {data.summary}
                            </p>
                        </section>
                    )}

                    {/* ================= 3. EXPERIENCE (Pengalaman Kerja) ================= */}
                    {experienceList.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Experience
                            </h3>
                            <div className="flex flex-col gap-4">
                                {experienceList.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-800">
                                                    {exp.position || "Nama Posisi"} <span className="font-normal text-gray-600">| {exp.company || "Nama Perusahaan"} {exp.location ? `• ${exp.location}` : ""}</span>
                                                </h4>
                                            </div>
                                            
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                {exp.startMonth} {exp.startYear} - {exp.isCurrent ? "Sekarang" : `${exp.endMonth} ${exp.endYear}`}
                                            </span>
                                        </div>

                                        {exp.companyDescription && (
                                            <p className="text-xs text-gray-500 italic mt-1">
                                                {exp.companyDescription}
                                            </p>
                                        )}

                                        {exp.responsibilities && (
                                            <p className="text-sm text-gray-700 whitespace-pre-line mt-1.5 text-justify pl-4">
                                                {exp.responsibilities}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ================= 4. EDUCATION (Pendidikan) ================= */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Education
                            </h3>
                            <div className="flex flex-col gap-4">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-800">{edu.institutionName || "Nama Institusi"}</h4>
                                                <p className="text-sm font-medium text-gray-600">
                                                    {edu.degree || "Gelar"} - {edu.fieldOfStudy || "Jurusan"}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded mb-1">
                                                    {edu.startDate || "Mulai"} - {edu.endDate || "Selesai"}
                                                </span>
                                                {edu.gpa && <span className="text-xs font-semibold text-gray-600">IPK: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                        {edu.description && (
                                            <p className="text-sm text-gray-700 mt-1">
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ================= 5. PROJECTS (Proyek) ================= */}
                    {data.project && data.project.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Projects
                            </h3>
                            <div className="flex flex-col gap-4">
                                {data.project.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-sm text-gray-800">{proj.name || "Nama Proyek"}</h4>
                                            {proj.type && (
                                                <span className="text-xs px-2 py-0.5 border rounded-full text-gray-500 border-gray-300">
                                                    {proj.type}
                                                </span>
                                            )}
                                        </div>
                                        {proj.description && (
                                            <p className="text-sm text-gray-700 whitespace-pre-line text-justify">
                                                {proj.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Layout Atas - Bawah untuk Skills dan Achievements */}
                    <div className="flex flex-col gap-8">
                        
                        {/* ================= 6. SKILLS (Keahlian Inline / Baris) ================= */}
                        {data.skills && data.skills.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                    Skills
                                </h3>
                                <div className="text-sm text-gray-700 leading-relaxed">
                                    {data.skills.map((skill, index) => (
                                        <span key={index}>
                                            <strong className="text-gray-900">{skill.category || "Kategori"}</strong>: {skill.description || "Keahlian..."}
                                            {index < data.skills.length - 1 && <span className="mx-2 text-gray-300">|</span>}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ================= 7. ACHIEVEMENTS (Pencapaian) ================= */}
                        {data.achievements && data.achievements.length > 0 && (
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                    Achievements
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {data.achievements.map((achieve, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-800 text-sm">{achieve.title || "Nama Pencapaian"}</h4>
                                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                    {achieve.date}
                                                </span>
                                            </div>
                                            <p className="text-sm font-medium text-gray-600 mt-0.5">
                                                {achieve.issuer || "Penyelenggara"}
                                            </p>
                                            {achieve.description && (
                                                <p className="text-sm text-gray-700 mt-1">
                                                    {achieve.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Template2;