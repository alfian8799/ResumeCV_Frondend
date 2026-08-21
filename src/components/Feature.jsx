import Title from './Title'; // Sesuaikan path import jika lokasinya berbeda

const Feature = () => {
    const features = [
        {
            title: "Practical Form Input",
            description: "Fill in your details through an intuitive and structured form.",
            image: "https://assets.prebuiltui.com/components/feature-sections/features-graphs-image.png",
            alt: "graph",
            hasTrending: true,
            imageClass: "max-w-56"
        },
        {
            title: "Real-time Preview",
            description: "Monitor every design change to your CV instantly without reloading.",
            image: "https://assets.prebuiltui.com/components/feature-sections/features-dash-img.png",
            alt: "Live Preview CV",
            hasTrending: false,
        },
        {
            title: "Export PDF & Save",
            description: "Secure your progress and download the final CV in a ready-to-use PDF format.",
            image: "https://assets.prebuiltui.com/components/feature-sections/features-social-image.png",
            alt: "Export PDF Document",
            hasTrending: false,
            imageClass: "max-w-60"
        }
    ];

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                `}
            </style>

            <section className='bg-black py-24 pb-64 px-4' id="features">
                <div className='max-w-6xl mx-auto flex flex-col items-center justify-center'>

                    {/* Memanggil Komponen Title yang sudah disesuaikan temanya */}
                    <Title
                        badge="Core Features"
                        title="Build Your Career Faster"
                        description="Our smart tools help you create a standout resume without reinventing the wheel."
                    />

                    {/* Grid Cards Features */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
                        {features.map((feature, index) => (
                            <div key={index} className='bg-neutral-900 border border-neutral-800 rounded-2xl hover:-translate-y-3 transition duration-300 p-6 flex flex-col'>
                                {feature.hasTrending && (
                                    <div className='bg-[#262626] px-2 py-1 rounded-full flex items-center gap-1.5 w-fit ml-auto mb-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00A63E" stroke="#00A63E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up-icon lucide-trending-up"><path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" /></svg>
                                        <p className='text-xs text-white/80'>45%</p>
                                    </div>
                                )}
                                <div className={`flex-1 flex items-center justify-center ${feature.imageContainerClass || ''}`}>
                                    <img className={`w-full object-contain ${feature.imageClass || ''}`} src={feature.image} alt={feature.alt} />
                                </div>
                                <h3 className='text-base font-medium text-white mt-8 text-left'>{feature.title}</h3>
                                <p className='text-sm text-white/50 mt-2 text-left max-w-2xs mb-4'>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Feature;