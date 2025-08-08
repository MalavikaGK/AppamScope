
import React from 'react';

interface ProcessingViewProps {
  uploadedImage: string | null;
}

const ProcessingView: React.FC<ProcessingViewProps> = ({ uploadedImage }) => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center text-center p-5 animate-slide-up">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 md:p-10 max-w-lg w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-300">
          Reading Your Appam's Cosmic Secrets...
        </h2>
        <div className="relative inline-block mb-6">
          {uploadedImage && (
            <img 
              src={uploadedImage} 
              alt="Your uploaded appam" 
              className="max-w-xs max-h-80 w-full h-auto object-cover rounded-xl shadow-2xl" 
            />
          )}
          <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
            <svg className="animate-spin h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        <p className="text-lg opacity-80">Connecting with the breakfast dimension...</p>
      </div>
    </section>
  );
};

export default ProcessingView;
