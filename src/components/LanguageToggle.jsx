import { useLanguage } from "../languageContext.js";

const LanguageToggle = ({ className = "" }) => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:border-violet-400 transition ${className}`}
      aria-label={`${t.language}: ${language === "id" ? t.indonesian : t.english}`}
    >
      {language === "id" ? "ID" : "EN"}
    </button>
  );
};

export default LanguageToggle;
