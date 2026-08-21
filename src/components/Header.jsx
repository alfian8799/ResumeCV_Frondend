import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
       <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
          *{
              font-family: "Geist", sans-serif;
          }
        `}
      </style>
      
      <header className="bg-black w-full pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="bg-neutral-950/80 backdrop-blur-md px-6 md:px-10 py-3.5 flex items-center justify-between max-w-7xl rounded-full mx-auto w-full border border-neutral-800 relative z-50">
          
          {/* Logo & Sapaan Pengguna */}
          <div className="flex items-center gap-6 md:gap-12">
            <a href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              {/* Ikon Custom VC */}
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 12 22 L 32 28 L 52 90 L 32 90 Z" fill="#ffffff" />
                <path d="M 35 60 Q 55 10 90 25 Q 92 30 82 35 Q 60 25 45 75 Z" fill="#8b5cf6" />
                <circle cx="62" cy="78" r="9" fill="#8b5cf6" />
                <path d="M 70 92 Q 90 95 98 75 Q 85 85 72 82 Z" fill="#8b5cf6" />
              </svg>
              
              {/* Teks Logo VinzCV */}
              <span className="text-white text-xl pt-2 md:text-2xl font-bold tracking-tight flex items-center">
                Vinz<span className="text-violet-500">CV</span>
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-neutral-400 font-medium">Hy, Alfian</span>
            <button className="flex items-center gap-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition text-sm font-medium pl-5 pr-1.5 py-1.5 rounded-full cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Logout
              <span className="size-7 rounded-full bg-white text-violet-600 flex items-center justify-center">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>

         

          {/* Tombol Hamburger Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1.5 focus:outline-none">
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Menu Dropdown Mobile */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col p-5 gap-3 md:hidden shadow-2xl z-50">
              <span className="text-sm text-neutral-400 px-2">Hy, Alfian</span>
              <button className="flex items-center justify-center gap-2.5 bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer w-full">
                Logout
                <span className="size-7 rounded-full bg-white text-violet-600 flex items-center justify-center">
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M.6 4.602h10m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
    )
}

export default Header
