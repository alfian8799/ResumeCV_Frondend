import { Link } from "react-router-dom"

const CallToAction = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

            <section className="bg-black w-full py-15 pb-50" id="cta">
                <div className="max-w-5xl md:w-full mx-2 md:mx-auto flex flex-col items-center justify-center text-center bg-linear-to-b from-[#301469] to-black rounded-2xl p-10 text-white ">

                    {/* BADGE: Tetap menggunakan outline dan teks transparan */}
                    <p className="px-6 py-2 rounded-full text-sm border border-[#54487B] bg-linear-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent cursor-default">
                        Ready to start?
                    </p>

                    <h1 className="text-4xl md:text-5xl md:leading-15 font-medium max-w-2xl mt-5">
                        Join 10,000+ Job Seekers
                        <span className="bg-linear-to-r from-[#A992F2] to-[#DFAB9B] bg-clip-text text-transparent"> landing their dream jobs</span>
                    </h1>

                    <p className="text-white text-sm mt-2">
                        Unlock all our premium resume templates instantly.
                    </p>

                    {/* TOMBOL: Diubah menjadi background solid gradient agar sangat menonjol */}
                    <Link to="/login" className="px-12 py-3 mt-6 rounded-full text-sm font-semibold text-[#1a0b3b] bg-linear-to-r from-[#A992F2] to-[#DFAB9B] hover:opacity-90 hover:-translate-y-1 active:scale-95 transition-all shadow-[0_0_20px_rgba(169,146,242,0.4)]">
                        Build My CV Now
                    </Link>

                </div>
            </section>
        </>
    )
}

export default CallToAction