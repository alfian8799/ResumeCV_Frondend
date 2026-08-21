const Footer = () => {
    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                *{ font-family: "Geist", sans-serif; }
            `}
            </style>

            <footer className='flex flex-col justify-end bg-black pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden w-full'>
                <div className='w-full max-w-7xl mx-auto'>
                    <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">

                        <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-start text-left">
                            {/* Logo VinzCV */}
                            <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                                {/* Ikon Custom VC */}
                                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M 12 22 L 32 28 L 52 90 L 32 90 Z"
                                        fill="#ffffff"
                                    />
                                    <path
                                        d="M 35 60 Q 55 10 90 25 Q 92 30 82 35 Q 60 25 45 75 Z"
                                        fill="#8b5cf6"
                                    />
                                    <circle
                                        cx="62" cy="78" r="9"
                                        fill="#8b5cf6"
                                    />
                                    <path
                                        d="M 70 92 Q 90 95 98 75 Q 85 85 72 82 Z"
                                        fill="#8b5cf6"
                                    />
                                </svg>

                                {/* Teks Logo VinzCV */}
                                <span className="text-white text-2xl font-bold tracking-tight">
                                    Vinz<span className="text-violet-500">CV</span>
                                </span>
                            </a>

                            {/* Diperbaiki dari bg-Linear-to-r menjadi bg-linear-to-r */}
                            <div className="w-full max-w-52 h-0.5 mt-8 bg-linear-to-r from-[#24212D] to-[#24212D]/0"></div>

                            <p className="text-sm text-white/60 mt-6 max-w-87.5 leading-relaxed">
                                VinzCV is a modern platform designed to help you build structured and professional CVs automatically in minutes.
                            </p>
                        </div>

                        <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
                            <h3 className="text-sm text-white font-medium">Important Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Home</a>
                                <a href="#features" className='text-sm text-white/60 hover:text-white transition-colors'>Features</a>
                                <a href="#testimoni" className='text-sm text-white/60 hover:text-white transition-colors'>Testimoni</a>
                                <a href="#cta" className='text-sm text-white/60 hover:text-white transition-colors'>Contact</a>
                            </div>
                        </div>

                        <div className="w-[45%] md:w-[45%] lg:w-[15%] flex flex-col items-start text-left">
                            <h3 className='text-sm text-white font-medium'>Social Links</h3>
                            <div className="flex flex-col gap-2 mt-6">
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Twitter</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Instagram</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Youtube</a>
                                <a href="#" className='text-sm text-white/60 hover:text-white transition-colors'>Linkedin</a>
                            </div>
                        </div>

                        <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-start text-left mt-4 md:mt-0">
                            <h3 className='text-sm text-white font-medium'>Subscribe for news</h3>
                            <div className="flex items-center border gap-2 border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                                <input type="email" placeholder="Enter your email.." className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs" required />
                                <button type="submit" className="bg-linear-to-b from-[#5623D8] to-[#7B53E2] hover:opacity-90 active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5 focus:outline-none">Subscribe</button>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-0.5 mt-16 mb-4 bg-linear-to-r from-[#24212D]/0 via-[#24212D] to-[#24212D]/0'></div>

                    <div className="flex flex-wrap sm:flex-row items-center justify-between gap-y-4 gap-x-2 relative z-10">
                        <p className='text-xs text-white/60'>© 2026 VinzCV. All rights reserved.</p>
                        <div className="flex items-center gap-6 text-right">
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Terms & Conditions</a>
                            <div className='w-px h-4 bg-white/20'></div>
                            <a href='#' className='text-xs text-white/60 hover:text-white transition-colors'>Privacy Policy</a>
                        </div>
                    </div>

                    {/* Watermark Teks Besar di Bawah */}
                    <div className="w-full flex justify-center mt-6 md:mt-12 md:mb-[-0.5%]">
                        <h1 className="text-center font-extrabold tracking-tighter leading-[0.70] text-zinc-900 text-[clamp(4.5rem,19.5vw,25rem)] pointer-events-none select-none">
                            VinzCV
                        </h1>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;