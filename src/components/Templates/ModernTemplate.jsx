import { Mail, Phone, MapPin, Link2, Globe, User } from "lucide-react";

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

const ModernTemplate = ({ data, accentColor = "#2563eb" }) => {
  const experienceList = data.experiences || data.exprience || [];
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
  const contentClass = (section) => sectionStyle(section) === "two-column"
    ? "grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3"
    : sectionStyle(section) === "compact" ? "flex flex-col gap-2" : "flex flex-col gap-4";
  const sectionSpacing = (section) => sectionStyle(section) === "compact" ? "mb-3" : "mb-6";

  return (
    <div className="w-full flex justify-center bg-neutral-100 p-4 md:p-8">
      <div
        id="preview-modern-template"
        className="resume-preview w-full max-w-[210mm] min-h-[297mm] h-[297mm] bg-white text-zinc-800 shadow-xl print:shadow-none print:m-0"
        style={{
          width: '100%',
          maxWidth: '210mm',
          minHeight: '297mm',
          height: '297mm',
          fontFamily: data.fontFamily || "Arial",
          textAlign: data.textAlign || "left",
          lineHeight,
          fontSize: `${baseFontSize}px`,
          "--resume-base-size": `${baseFontSize}px`,
          "--resume-line-height": lineHeight,
        }}
      >
        <div className="grid grid-cols-3">
          <div className="col-span-1 py-10 flex justify-center">
            {/* Foto Profil atau Placeholder Penanda */}
            {data.personalInfo?.image && typeof data.personalInfo.image === "string" ? (
              <div className="mb-6">
                <img
                  src={data.personalInfo.image}
                  alt="Profile"
                  className="w-24 h-28 object-cover rounded-md shadow-sm border border-gray-200 mx-auto"
                />
              </div>
            ) : data.personalInfo?.image && typeof data.personalInfo.image === "object" ? (
              <div className="mb-6">
                <img
                  src={URL.createObjectURL(data.personalInfo.image)}
                  alt="Profile"
                  className="w-24 h-28 object-cover rounded-md shadow-sm border border-gray-200 mx-auto"
                />
              </div>
            ) : (
              /* Penanda / Placeholder Foto Kosong */
              <div className="mb-6 w-24 h-28 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 mx-auto text-center p-2">
                <User className="w-8 h-8 mb-1 stroke-[1.5]" />
                <span className="text-[10px] font-medium leading-tight">Foto Profil</span>
              </div>
            )}
          </div>

          {/* Name + Title */}
          <div className="col-span-2 flex flex-col justify-center py-10 px-8">
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1" style={{ color: accentColor }}>
              {data.personalInfo?.fullName || data.personalInfo?.fullname || "Nama Lengkap Anda"}
            </h1>
            {data.personalInfo?.jobTitle && (
              <h2 className="text-lg font-medium text-gray-600 mb-3">
                {data.personalInfo.jobTitle}
              </h2>
            )}
          </div>

          {/* Left Sidebar */}
          <aside className="col-span-1 border-r border-zinc-200 p-6 pt-0">
            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                CONTACT
              </h2>
              <div className="space-y-2 text-xs text-gray-700">
                {data.personalInfo?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span>{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span className="break-all">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo?.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <span>{data.personalInfo.address}</span>
                  </div>
                )}
                {(data.personalInfo?.linkedin || data.personalInfo?.linkendinUrl) && (
                  <div className="flex items-center gap-2">
                    <Link2 className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <a href={data.personalInfo.linkedin || data.personalInfo.linkendinUrl} target="_blank" rel="noreferrer" className="hover:underline break-all">
                      {data.personalInfo.linkedin || data.personalInfo.linkendinUrl}
                    </a>
                  </div>
                )}
                {(data.personalInfo?.portfolioUrl || data.personalInfo?.portofolioUrl) && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: accentColor }} />
                    <a href={data.personalInfo.portfolioUrl || data.personalInfo.portofolioUrl} target="_blank" rel="noreferrer" className="hover:underline break-all">
                      {data.personalInfo.portfolioUrl || data.personalInfo.portofolioUrl}
                    </a>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <section className={sectionSpacing("skills")} style={sectionOrderStyle("skills")}>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  SKILLS
                </h2>
                <div className={sectionStyle("skills") === "two-column" ? "grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-gray-700" : "space-y-2 text-xs text-gray-700"}>
                  {data.skills.map((skill, index) => (
                    <div key={index}>
                      {typeof skill === 'object' ? (
                        <div>
                          <strong className="text-gray-900">{skill.category || ""}</strong>
                          {skill.description && <p className="text-gray-600">{skill.description}</p>}
                        </div>
                      ) : (
                        <span>• {skill}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* Right Content */}
          <main className="col-span-2 p-8 pt-0 flex flex-col">
            {/* Summary */}
            {data.summary && (
              <section className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-3 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  SUMMARY
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line text-justify">{data.summary}</p>
              </section>
            )}

            {/* Experience */}
            {experienceList.length > 0 && (
              <section className={sectionSpacing("experience")} style={sectionOrderStyle("experience")}>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  EXPERIENCE
                </h2>
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
                          {exp.startMonth || exp.startDate || ""} {exp.startYear || ""} - {exp.isCurrent || exp.is_current ? "Sekarang" : `${exp.endMonth || exp.endDate || ""} ${exp.endYear || ""}`}
                        </span>
                      </div>
                      {exp.companyDescription && (
                        <p className="text-xs text-gray-500 italic mt-1">{exp.companyDescription}</p>
                      )}
                      {exp.responsibilities && (
                        <ResponsibilityPoints value={exp.responsibilities} />
                      )}
                      {exp.description && !exp.responsibilities && (
                        <p className="text-sm text-gray-700 whitespace-pre-line mt-1.5 text-justify">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <section className={sectionSpacing("education")} style={sectionOrderStyle("education")}>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  EDUCATION
                </h2>
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
                          {edu.gpa && <span className="text-xs font-semibold text-gray-600">IPK: {edu.gpa}</span>}
                        </div>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <section className={sectionSpacing("projects")} style={sectionOrderStyle("projects")}>
                <h2 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  PROJECTS
                </h2>
                <div className={contentClass("projects")}>
                  {data.projects.map((proj, index) => (
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
                        <p className="text-sm text-gray-700 whitespace-pre-line text-justify">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* ================= 7. ACHIEVEMENTS (Pencapaian) ================= */}
            {data.achievements && data.achievements.length > 0 && (
              <section className={sectionSpacing("achievements")} style={sectionOrderStyle("achievements")}>
                <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-1 mb-4 text-gray-800" style={{ color: accentColor, borderColor: accentColor }}>
                  Achievements
                </h3>
                <div className={contentClass("achievements")}>
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
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;