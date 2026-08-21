import { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };

    return (
        <>
            <style>
                {`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                *{
                    font-family: "Poppins", sans-serif;
                }
            `}
            </style>

            <section className='bg-black bg-[url("https://assets.prebuiltui.com/components/hero-section/hero-net-image.png")] bg-no-repeat bg-bottom bg-size-[100%_auto] px-4 pt-5 md:pb-32'>
                <nav className="flex items-center justify-between px-2.5 md:pl-6 py-2 max-w-6xl rounded-full mx-auto w-full border border-white/20">
                    <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        {/* Ikon Custom VC */}
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 12 22 L 32 28 L 52 90 L 32 90 Z" fill="#ffffff" />
                            <path d="M 35 60 Q 55 10 90 25 Q 92 30 82 35 Q 60 25 45 75 Z" fill="#8b5cf6" />
                            <circle cx="62" cy="78" r="9" fill="#8b5cf6" />
                            <path d="M 70 92 Q 90 95 98 75 Q 85 85 72 82 Z" fill="#8b5cf6" />
                        </svg>

                        {/* Teks Logo VinzCV (Sekarang disejajarkan ke tengah secara vertikal) */}
                        <span className="text-white text-2xl pt-2 font-bold tracking-tight flex items-center">
                            Vinz<span className="text-violet-500">CV</span>
                        </span>
                    </a>

                    <nav id="menu" className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-screen ${isMenuOpen ? 'max-md:w-full bg-black/10 backdrop-blur-md z-50' : 'max-md:w-0'} transition-[width] flex-col md:flex-row flex gap-8 text-white text-sm font-normal`}>
                        <a className="hover:text-white/80" href="#">Home</a>
                        <a className="hover:text-white/80" href="#features">Features</a>
                        <a className="hover:text-white/80" href="#testimoni">Testimoni</a>
                        <a className="hover:text-white/80" href="#cta">Contact</a>

                        <Link to="/login" className="md:hidden flex bg-violet-600 text-slate-100 pr-8 pl-2 py-2 rounded-full text-base font-medium hover:bg-violet-700 transition items-center">
                            <div className='size-9 rounded-full text-violet-600 bg-white mr-4 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                            </div>
                            Get started
                        </Link>
                        <button id="closeMenu" onClick={toggleMenu} className="md:hidden text-gray-600 bg-white/10 p-1.5 rounded-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </nav>
                    {/* Tombol Get Started - Desktop Version */}
                    <div className="flex items-center">
                        <Link to="/login" className="hidden md:flex bg-violet-600 text-slate-100 pr-8 pl-2 py-2 rounded-full text-base font-medium hover:bg-violet-700 transition items-center">
                            <div className='size-9 rounded-full text-violet-600 bg-white mr-4 flex items-center justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
                            </div>
                            Get started
                        </Link>


                        <button id="openMenu" onClick={toggleMenu} className="md:hidden text-gray-600 bg-white/10 p-1.5 rounded-md">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="flex items-center gap-2 border border-white/15 rounded-full pl-2 pr-3 py-2 text-sm w-fit mt-35 mx-auto">
                    <span className="flex items-center gap-1 text-violet-200 text-xs sm:text-sm">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4m7-3a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1m-2 10a.75.75 0 0 1 .728.568.97.97 0 0 0 .704.704.75.75 0 0 1 0 1.456.97.97 0 0 0-.704.704.75.75 0 0 1-1.456 0 .97.97 0 0 0-.704-.704.75.75 0 0 1 0-1.456.97.97 0 0 0 .704-.704A.75.75 0 0 1 10 11" fill="#7F22FE" />
                        </svg>
                        New template options have been added.
                    </span>
                    <span className="text-indigo-500 text-base">•</span>
                    <a href="#" className="flex items-center gap-1 text-indigo-400 text-xs sm:text-xs">
                        Learn more
                        <svg className="mt-1" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <h1 className='text-4xl md:text-[90px]/19 text-center max-w-4xl mx-auto mt-4 text-white bg-clip-text leading-tight font-medium'>Build a Structured CV Automatically</h1>
                <p className="text-base mx-auto text-gray-400 text-center mt-6">
                    No need to design manually. Create your professional Curriculum Vitae in minutes, hassle-free.
                </p>

                {/* Avatars + Stars */}
                <div className="flex items-center mt-15 pb-10 justify-center">
                    <div className="flex -space-x-3 pr-3">
                        {/* Mengubah z-[1], z-[3], z-[4] menjadi z-1, z-3, z-4 */}
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-1" />
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-2" />
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-3" />
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-9.5 object-cover rounded-full border-2 border-slate-50 hover:-translate-y-0.5 transition z-4" />
                    </div>

                    <div>
                        <div className="flex ">
                            {Array(5).fill(0).map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-[#615FFF]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                            ))}
                        </div>
                        <p className="text-xs text-white/60">Used by 10,000+ users</p>
                    </div>
                </div>


                <Link to="/login" className='flex gap-3  pt-25 pb-10 justify-center'>
                    <button className="bg-violet-600 hover:bg-violet-700 text-slate-100 text-xs md:text-sm px-6 py-3 rounded-full transition cursor-pointer">
                        Start Building CV
                    </button>
                </Link>
            </section>
        </>
    );
}

export default Hero;