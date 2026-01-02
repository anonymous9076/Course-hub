import React from 'react';
import { X, ZoomIn } from 'lucide-react';

const ImageFullViewModal = ({ isOpen, onClose, imageUrl, title }) => {
    if (!isOpen || !imageUrl) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center h-screen justify-center bg-black/90 backdrop-blur-xl transition-all duration-300">
            <div className="absolute top-6 right-6 flex items-center gap-4 z-10">
                <h3 className="text-white/60 font-bold uppercase tracking-widest text-xs hidden md:block">
                    Viewing: {title}
                </h3>
                <button
                    onClick={onClose}
                    className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all active:scale-95 group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-300">
                <img
                    src={imageUrl}
                    alt={title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_100px_rgba(45,92,254,0.3)] border border-white/10"
                />
            </div>
        </div>
    );
};

export default ImageFullViewModal;
