
import React, { useState, useRef, useCallback } from 'react';
import { AppState } from './types';
import type { HoroscopeResult } from './types';
import { getHoroscopeFromAppam } from './services/geminiService';
import Background from './components/Background';
import Hero from './components/Hero';
import ProcessingView from './components/ProcessingView';
import HoroscopeCard from './components/HoroscopeCard';
import EasterEgg from './components/EasterEgg';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [horoscopeData, setHoroscopeData] = useState<HoroscopeResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [easterEggClicks, setEasterEggClicks] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setAppState(AppState.PROCESSING);
        setError(null);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64String = (reader.result as string).split(',')[1];
            setUploadedImage(reader.result as string);

            try {
                const result = await getHoroscopeFromAppam(base64String, file.type);
                setHoroscopeData(result);
                setAppState(AppState.RESULT);
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
                setAppState(AppState.ERROR);
            }
        };
        reader.onerror = () => {
             setError("Failed to read the file.");
             setAppState(AppState.ERROR);
        };
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleTryAgain = () => {
        setAppState(AppState.IDLE);
        setUploadedImage(null);
        setHoroscopeData(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const handleEasterEggClick = () => {
        const newCount = easterEggClicks + 1;
        setEasterEggClicks(newCount);
        if (newCount >= 3) {
            setShowEasterEgg(true);
            setEasterEggClicks(0);
        }
    };

    const renderContent = () => {
        switch (appState) {
            case AppState.PROCESSING:
                return <ProcessingView uploadedImage={uploadedImage} />;
            case AppState.RESULT:
                return horoscopeData && <HoroscopeCard data={horoscopeData} onTryAgain={handleTryAgain} />;
            case AppState.ERROR:
                return (
                     <div className="min-h-screen w-full flex flex-col justify-center items-center text-center p-5">
                         <div className="bg-red-500/20 backdrop-blur-2xl border border-red-500/50 rounded-2xl p-8 max-w-lg w-full animate-slide-up">
                             <div className="text-5xl mb-4">🚨</div>
                             <h2 className="text-3xl font-bold mb-2 text-red-300">Cosmic Interference!</h2>
                             <p className="text-lg opacity-90">{error}</p>
                             <button onClick={handleTryAgain} className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full mt-8 transition-transform duration-300 ease-in-out hover:scale-105">
                                 Try Again
                             </button>
                         </div>
                     </div>
                );
            case AppState.IDLE:
            default:
                return <Hero onUploadClick={handleUploadClick} />;
        }
    };
    
    return (
        <main className="bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#16213e] text-white min-h-screen overflow-x-hidden relative">
            <Background />
            <div className="container mx-auto px-5 relative z-10">
                {renderContent()}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3">
                <div onClick={handleEasterEggClick} className="text-3xl cursor-pointer transition-transform hover:scale-125 hover:rotate-12">🌟</div>
                <div onClick={handleEasterEggClick} className="text-3xl cursor-pointer transition-transform hover:scale-125 hover:rotate-12">🔮</div>
                <div onClick={handleEasterEggClick} className="text-3xl cursor-pointer transition-transform hover:scale-125 hover:rotate-12">⭐</div>
            </div>
            <EasterEgg show={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
        </main>
    );
};

export default App;
