import { Mail, Phone, MapPin, Link, ExternalLink } from 'lucide-react';

const ResponsibilityPoints = ({ value }) => {
    const points = value.split(/\r?\n/).map((point) => point.replace(/^[•\-*]\s*/, '').trim()).filter(Boolean);

    return (
        <div className="flex flex-col gap-1.5 text-sm text-gray-700 mt-1.5">
            {points.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    <span className="min-w-0 flex-1">{point}</span>
                </div>
            ))}
        </div>
    );
};

const ClassicTemplate = ({ data, accentColor = "#2563eb" }) => {
    const experienceList = data.experiences || data.exprience || [];
    const projectList = data.projects || data.project || [];
    const achievementList = data.achievements || [];
    const defaultSectionOrder = ["experience", "education", "projects", "skills", "achievements"];
    const savedOrder = data.layout?.sectionOrder || [];
    const sectionOrder = [
        ...savedOrder,
        ...defaultSectionOrder.filter((section) => !savedOrder.includes(section)),
    ];
    const sectionLayouts = data.layout?.sectionLayouts || {};
    const textSizeScale = { Small: 0.88, Medium: 1, Large: 1.12 };
    const baseFontSize = 14 * (textSizeScale[data.textSize] || 1);
    const lineHeight = data.lineSpacing === "tight" ? "1.2" : data.lineSpacing === "relaxed" ? "1.8" : "1.5";
    const sectionStyle = (section) => sectionLayouts[section] || "standard";
    const sectionOrderStyle = (section) => ({ order: sectionOrder.indexOf(section) + 1 });
    const contentClass = (section) => {
        const style = sectionStyle(section);
        return style === "two-column"
            ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
            : style === "compact" ? "flex flex-col gap-2" : "flex flex-col gap-4";
    };
    const sectionSpacing = (section) => sectionStyle(section) === "compact" ? "mb-3" : "mb-6";

    return (
        <div className="w-full flex justify-center bg-neutral-100 p-4 md:p-8">
            <div
                id="preview-classic"
                className="resume-preview w-full max-w-[210mm] min-h-[297mm] bg-white text-gray-800 shadow-xl print:shadow-none print:m-0"
                style={{
                    fontFamily: data.fontFamily || "Arial",
                    textAlign: data.textAlign || "left",
                    lineHeight,
                    fontSize: `${baseFontSize}px`,
                    "--resume-base-size": `${baseFontSize}px`,
                    "--resume-line-height": lineHeight,
                }}
            >
                <div className="p-8 md:p-12 leading-relaxed">
                    {/* ================= 1. HEADER (Foto, Nama, & Kontak) ================= */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 border-b-2 pb-6" style={{ borderColor: accentColor }}>

                        {data.personalInfo?.photo && (
                            <img
                                src={data.personalInfo.photo}
                                alt="Profile"
                                className="w-24 h-28 object-cover rounded-md shadow-sm border border-gray-200"
                            />
                        )}

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1" style={{ color: accentColor }}>
                                {data.personalInfo?.fullName || data.personalInfo?.fullname || "Nama Lengkap Anda"}
                            </h1>

                            {data.personalInfo?.jobTitle && (
                                <h2 className="text-lg font-medium text-gray-600 mb-3">
                                    {data.personalInfo.jobTitle}
                                </h2>
                            )}

                            {/* Kontak Info Berderet Horizontal */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-700">
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
                                {(data.personalInfo?.portfolioUrl || data.personalInfo?.portofolioUrl) && (
                                    <div className="flex items-center gap-1.5">
                                        <ExternalLink className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <a href={data.personalInfo.portfolioUrl || data.personalInfo.portofolioUrl} target="_blank" rel="noreferrer" className="hover:underline">
                                            {data.personalInfo.portfolioUrl || data.personalInfo.portofolioUrl}
                                        </a>
                                    </div>
                                )}
                                {(data.personalInfo?.linkedin || data.personalInfo?.linkendinUrl) && (
                                    <div className="flex items-center gap-1.5">
                                        <Link className="w-3.5 h-3.5" style={{ color: accentColor }} />
                                        <a href={data.personalInfo.linkedin || data.personalInfo.linkendinUrl} target="_blank" rel="noreferrer" className="hover:underline">
                                            {data.personalInfo.linkedin || data.personalInfo.linkendinUrl}
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

                    <div className="flex flex-col">
                    {/* ================= 3. EXPERIENCE (Pengalaman Kerja) ================= */}
                    {experienceList.length > 0 && (
                        <section className={sectionSpacing("experience")} style={sectionOrderStyle("experience")}>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Experience
                            </h3>
                            <div className={contentClass("experience")}>
                                {experienceList.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-800">
                                                    {exp.position || "Nama Posisi"} <span className="font-normal text-gray-600">| {exp.company || "Nama Perusahaan"} {exp.location ? `• ${exp.location}` : ""}</span>
                                                </h4>
                                            </div>

                                            <span className="text-xs font-semibold text-gray-500 px-2 py-1">
                                                {exp.startMonth || exp.startDate}/{exp.startYear || ""} - {exp.isCurrent || exp.is_current ? "Sekarang" : `${exp.endMonth || exp.endDate || ""}/${exp.endYear || ""}`}
                                            </span>
                                        </div>

                                        {exp.companyDescription && (
                                            <p className="text-xs text-gray-500 italic mt-1">
                                                {exp.companyDescription}
                                            </p>
                                        )}

                                        {exp.responsibilities && (
                                            <ResponsibilityPoints value={exp.responsibilities} />
                                        )}
                                        {exp.description && !exp.responsibilities && (
                                            <p className="text-sm text-gray-700 whitespace-pre-line mt-1.5 text-justify">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ================= 4. EDUCATION (Pendidikan) ================= */}
                    {data.education && data.education.length > 0 && (
                        <section className={sectionSpacing("education")} style={sectionOrderStyle("education")}>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Education
                            </h3>
                            <div className={contentClass("education")}>
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-800">{edu.institutionName || edu.intitutionName || "Nama Institusi"}</h4>
                                                <p className="text-sm font-medium text-gray-600">
                                                    {edu.degree || "Gelar"} - {edu.fieldOfStudy || "Jurusan"}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs font-semibold text-gray-500 px-2 py-1 mb-1">
                                                    {edu.startDate || "Mulai"} - {edu.endDate || "Selesai"}
                                                </span>
                                                {edu.gpa && <span className="text-xs font-semibold text-gray-600">GPA: {edu.gpa}/4.00</span>}
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
                    {projectList.length > 0 && (
                        <section className={sectionSpacing("projects")} style={sectionOrderStyle("projects")}>
                            <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                Projects
                            </h3>
                            <div className={contentClass("projects")}>
                                {projectList.map((proj, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-sm text-gray-800">{proj.name || "Nama Proyek"}</h4>
                                            {proj.type && (
                                                <span className="text-xs px-2 py-0.5 text-gray-500 border-gray-300">
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
                    <div className="contents">

                        {/* ================= 6. SKILLS (Keahlian List Vertikal) ================= */}
                        {data.skills && data.skills.length > 0 && (
                            <section className={sectionSpacing("skills")} style={sectionOrderStyle("skills")}>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                    Skills
                                </h3>
                                <div className={contentClass("skills")}>
                                    {data.skills.map((skill, index) => (
                                        <div key={index} className="text-sm text-gray-700">
                                            {typeof skill === 'object' ? (
                                                <p>
                                                    <strong className="text-gray-900">{skill.category || "Kategori"}</strong>
                                                    {skill.description ? `: ${skill.description}` : ""}
                                                </p>
                                            ) : (
                                                <p>• {skill}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ================= 7. ACHIEVEMENTS (Pencapaian) ================= */}
                        {achievementList.length > 0 && (
                            <section className={sectionSpacing("achievements")} style={sectionOrderStyle("achievements")}>
                                <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                                    Achievements
                                </h3>
                                <div className={contentClass("achievements")}>
                                    {achievementList.map((achievement, index) => (
                                        <div key={achievement._id || index}>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-800 text-sm">
                                                    {achievement.category || achievement.title || "Nama Pencapaian"}
                                                </h4>
                                                {achievement.date && (
                                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                        {achievement.date}
                                                    </span>
                                                )}
                                            </div>
                                            {achievement.issuer && (
                                                <p className="text-sm font-medium text-gray-600 mt-0.5">
                                                    {achievement.issuer}
                                                </p>
                                            )}
                                            {achievement.description && (
                                                <p className="text-sm text-gray-700 mt-1">
                                                    {achievement.description}
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
        </div>
    );
};

export default ClassicTemplate;