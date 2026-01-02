import React from 'react';
import { Trash2, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to delete this? This action cannot be undone." }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl transform transition-all animate-in fade-in zoom-in duration-300">
                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-inner">
                            <Trash2 size={28} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 leading-relaxed font-medium">
                        {message}
                    </p>
                </div>

                <div className="p-6 bg-gray-50 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 px-6 bg-white text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 px-6 bg-red-500 text-white font-bold rounded-2xl shadow-lg shadow-red-200 hover:bg-red-600 hover:shadow-red-300 transition-all active:scale-95"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
