import React from 'react';

interface PhotoGalleryModalProps {
  isOpen: boolean;
  imageUrl: string | null;
  caption: string;
  onClose: () => void;
}

export const PhotoGalleryModal: React.FC<PhotoGalleryModalProps> = ({
  isOpen,
  imageUrl,
  caption,
  onClose
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-lg w-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          aria-label="Close photo view"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black w-full border border-white/20">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
          <div className="p-3 bg-[#1f2421] text-white flex items-center justify-between">
            <span className="text-xs font-semibold">{caption}</span>
            <span className="text-[11px] text-white/70">Paradise Hotel &amp; Restaurant · Gilgit</span>
          </div>
        </div>
      </div>
    </div>
  );
};
