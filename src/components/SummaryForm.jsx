

const SummaryForm = ({
  data = "",
  onChange,
//    setResumeData
}) => {
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="border-b border-neutral-800 pb-2 mb-2">
        <h3 className="text-lg font-semibold text-white">Summary</h3>
        <p className="text-xs text-neutral-500 mt-1">Tuliskan ringkasan singkat mengenai profil profesional dan tujuan karier Anda.</p>
      </div>
      
      {/* Kotak Input Teks Area untuk Summary */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-neutral-400">Profil Profesional</label>
        <textarea
          value={data === "Default Summary" ? "" : data}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Entry Your Summary"
          className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors resize-none h-56"
        ></textarea>
      </div>
    </div>
  );
}

export default SummaryForm;