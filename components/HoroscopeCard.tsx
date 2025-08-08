
import React from 'react';
import { HoroscopeResult } from '../types';
import { ZODIAC_SYMBOLS } from '../constants';

interface HoroscopeCardProps {
  data: HoroscopeResult;
  onTryAgain: () => void;
}

const HoroscopeCard: React.FC<HoroscopeCardProps> = ({ data, onTryAgain }) => {
  const zodiacSymbol = ZODIAC_SYMBOLS[data.zodiacName.toLowerCase()] || '✨';

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center text-center p-5">
      <div className="bg-gradient-to-br from-cyan-500/20 to-red-500/20 backdrop-blur-2xl border border-white/30 rounded-2xl p-6 md:p-10 max-w-2xl w-full animate-slide-up">
        {data.isAppam ? (
          <>
            <div className="text-6xl md:text-7xl mb-4 animate-spin [animation-duration:10s]">
              {zodiacSymbol}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300 capitalize">
              {data.zodiacName}
            </h2>
            <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-xl mx-auto">
              {data.horoscope}
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl md:text-7xl mb-4">🤔</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-yellow-300">
              Cosmic Confusion!
            </h2>
            <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-xl mx-auto">
              {data.rejectionReason}
            </p>
          </>
        )}
        <button
          onClick={onTryAgain}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full mt-8 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
        >
          Try Another Appam
        </button>
      </div>
    </section>
  );
};

export default HoroscopeCard;
