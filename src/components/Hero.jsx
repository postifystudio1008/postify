import React from 'react';
import { Coffee } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative w-full h-80 overflow-hidden shadow-2xl">
            {/* Fixed Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1920')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full pt-10 text-center animate-fade-in">
                <Coffee size={48} className="text-white mb-3 opacity-90" />
                <h1 className="text-5xl font-serif font-bold text-white tracking-wide drop-shadow-lg">
                    Black Bird's Cafe
                </h1>
                <p className="text-sm font-sans text-gray-200 mt-2 tracking-[0.2em] uppercase font-light">
                    Elegance in Every Sip
                </p>
            </div>
        </div>
    );
};

export default Hero;
