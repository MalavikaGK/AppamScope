
import React from 'react';

interface HeroProps {
  onUploadClick: () => void;
}

const AppamFloat = () => (
    <div className="w-40 h-40 md:w-52 md:h-52 bg-[radial-gradient(circle,#f4e4bc_20%,#d4af37_40%,transparent_70%)] rounded-full mb-10 relative shadow-[0_0_50px_rgba(212,175,55,0.3)] animate-float-appam">
      <div className="absolute top-[30%] left-[35%] w-4 h-4 bg-transparent rounded-full shadow-[0_0_0_3px_#8B4513,25px_10px_0_2px_#8B4513,-10px_20px_0_1px_#8B4513,15px_-15px_0_2px_#8B4513,-20px_-5px_0_1px_#8B4513]"></div>
    </div>
);

const Hero: React.FC<HeroProps> = ({ onUploadClick }) => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center text-center p-5">
      <AppamFloat />
      <h1 className="text-5xl md:text-7xl font-bold mb-5 bg-gradient-to-r from-yellow-400 via-red-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
        AppamScope
      </h1>
      <p className="text-xl md:text-2xl mb-12 opacity-90 italic">
        Your Horoscope... Straight from the Appam!
      </p>
      <button 
        className="bg-gradient-to-r from-red-500 to-yellow-400 text-white font-bold py-4 px-8 md:py-5 md:px-10 text-lg md:text-xl rounded-full transition-transform duration-300 ease-in-out hover:scale-105 animate-pulse-glow"
        onClick={onUploadClick}
      >
        ✨ Upload Your Appam ✨
      </button>
    </section>
  );
};

export default Hero;
