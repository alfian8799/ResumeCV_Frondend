
const Title = ({ badge, title, description }) => {
  return (

    <div className='bg-black flex items-center flex-col justify-center text-center py-16'>
      {/* Badge dinamis */}
      <span className='bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-medium px-6 py-2 rounded-full tracking-wider uppercase'>
        {badge}
      </span>

      {/* Judul utama dinamis */}
      <h2 className='text-white font-medium text-4xl md:text-[40px] mt-6'>
        {title}
      </h2>

      {/* Deskripsi dinamis */}
      <p className='text-base text-white/60 max-w-lg mt-2'>
        {description}
      </p>
    </div>
  );
};

export default Title;