import { useState } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Button } from './ui/button';

interface PhotoLibraryProps {
  onSelect: (photos: string[]) => void;
  onCancel: () => void;
  maxSelection?: number;
}

// Mock photos - in real app, these would come from device photo library
const mockPhotos = [
  'https://images.unsplash.com/photo-1651399436026-3ca4088b3d6e?w=400',
  'https://images.unsplash.com/photo-1690915475414-9aaecfd3ba74?w=400',
  'https://images.unsplash.com/photo-1688845465690-e5ea24774fd5?w=400',
  'https://images.unsplash.com/photo-1739417083034-4e9118f487be?w=400',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
];

export function PhotoLibrary({ onSelect, onCancel, maxSelection = 5 }: PhotoLibraryProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const togglePhoto = (photo: string) => {
    setSelectedPhotos((prev) => {
      if (prev.includes(photo)) {
        return prev.filter((p) => p !== photo);
      }
      if (prev.length < maxSelection) {
        return [...prev, photo];
      }
      return prev;
    });
  };

  const handleConfirm = () => {
    onSelect(selectedPhotos);
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-[#FFF8F0]">
      {/* Header */}
      <header className="bg-white border-b border-[#DEB887] px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onCancel} className="text-[#A0522D]">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[#8B4513] text-xl">Photo Library</h1>
          </div>
          {selectedPhotos.length > 0 && (
            <span className="text-[#A0522D]">
              {selectedPhotos.length}/{maxSelection}
            </span>
          )}
        </div>
      </header>

      {/* Photo Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2">
          {mockPhotos.map((photo, index) => {
            const isSelected = selectedPhotos.includes(photo);
            return (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => togglePhoto(photo)}
              >
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#8B4513]/50 flex items-center justify-center">
                    <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                {!isSelected && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      {selectedPhotos.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-[#DEB887] p-4 max-w-lg mx-auto">
          <Button
            onClick={handleConfirm}
            className="w-full bg-[#8B4513] hover:bg-[#A0522D] text-white"
          >
            Select {selectedPhotos.length} Photo{selectedPhotos.length !== 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}



