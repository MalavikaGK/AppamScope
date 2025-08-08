
import React from 'react';

interface EasterEggProps {
    show: boolean;
    onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] p-4">
            <div className="bg-black border-2 border-yellow-400 rounded-2xl p-6 md:p-8 text-center max-w-md w-full relative animate-slide-up">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">🎉 Secret Appam Wisdom! 🎉</h3>
                <p className="opacity-90">
                    "Your appam reveals that you have excellent taste in South Indian breakfast foods. A mysterious stranger will compliment your dosa-making skills this week. Lucky numbers: The number of holes in your appam!"
                </p>
                <button 
                    onClick={onClose}
                    className="mt-6 bg-yellow-400 text-black font-bold py-2 px-6 rounded-full cursor-pointer transition-transform hover:scale-105"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default EasterEgg;
