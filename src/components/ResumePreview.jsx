import ModernTemplate from './Templates/ModernTemplate.jsx';
import ClassicTemplate from './Templates/ClassicTemplate.jsx';


const ResumePreview = ({ data, template, accentColor = "#8b5cf6" }) => {
    // Mengantisipasi perbedaan penamaan properti (exprience vs experiences)
   const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    };

    return (
        <div className="w-full flex justify-center bg-neutral-100 p-4 md:p-8">

            {/* Kertas Resume (ukuran A4 proporsional) */}
            <div
                id="preview-resume"
                style={{
                    fontFamily: data.fontFamily || "Arial",
                    textAlign: data.textAlign || "left",
                    lineHeight: data.lineSpacing === "tight" ? "1.2" : data.lineSpacing === "relaxed" ? "1.8" : "1.5",
                    fontSize: `${data.fontSizeNum || 14}px`
                }}
            >
                {/* Render template berdasarkan pilihan */}
                {renderTemplate()}

            </div>
        </div>
    );
};

export default ResumePreview;