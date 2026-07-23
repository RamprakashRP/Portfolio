'use client';
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  itemId: string;
  basePath: string; // e.g., "/achievements/"
  existingUrls?: { preview?: string; home?: string; highlight?: string };
  targetCrop?: 'preview' | 'home' | 'highlight' | null;
  onComplete: (urls: { preview?: string; home?: string; highlight?: string }) => void;
}

type CropStep = {
  id: 'preview' | 'home' | 'highlight';
  title: string;
  ratio: number;
  fileName: string;
};

const STEPS: CropStep[] = [
  { id: 'preview', title: 'Mobile Cover (Square)', ratio: 1 / 1, fileName: 'cover-mobile.jpg' },
  { id: 'home', title: 'Tablet Cover (Standard)', ratio: 4 / 3, fileName: 'cover-tablet.jpg' },
  { id: 'highlight', title: 'Desktop Cover (Wide)', ratio: 16 / 9, fileName: 'cover-desktop.jpg' },
];

export default function ImageCropperModal({ isOpen, onClose, imageUrl, itemId, basePath, existingUrls, targetCrop, onComplete }: Props) {
  const [activeTab, setActiveTab] = useState<'preview' | 'home' | 'highlight'>(targetCrop || 'preview');
  
  const stepsToRender = targetCrop ? STEPS.filter(s => s.id === targetCrop) : STEPS;
  
  const [skipCrop, setSkipCrop] = useState<Record<string, boolean>>(() => ({
    preview: targetCrop === 'preview' ? false : !!existingUrls?.preview,
    home: targetCrop === 'home' ? false : !!existingUrls?.home,
    highlight: targetCrop === 'highlight' ? false : !!existingUrls?.highlight
  }));
  
  // States per tab
  const [crops, setCrops] = useState({
    preview: { x: 0, y: 0 },
    home: { x: 0, y: 0 },
    highlight: { x: 0, y: 0 }
  });
  
  const [zooms, setZooms] = useState({
    preview: 1,
    home: 1,
    highlight: 1
  });
  
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>({
    preview: null,
    home: null,
    highlight: null
  });

  const [isUploading, setIsUploading] = useState(false);

  const onCropComplete = useCallback((croppedArea: any, pixels: any) => {
    setCroppedAreaPixels((prev: any) => ({ ...prev, [activeTab]: pixels }));
  }, [activeTab]);

  const createCrop = async (imageSrc: string, pixelCrop: any): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('No 2d context');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        if (file) resolve(file);
        else reject(new Error('Canvas is empty'));
      }, 'image/jpeg', 0.95);
    });
  };

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const handleApproveAll = async () => {
    setIsUploading(true);
    try {
      const categoryFolder = basePath.replace(/\//g, '');
      const urls: Record<string, string> = {};

      for (const step of stepsToRender) {
        if (skipCrop[step.id] && existingUrls?.[step.id] && !targetCrop) {
          urls[step.id] = existingUrls[step.id]!;
          continue;
        }

        if (!croppedAreaPixels[step.id]) {
          alert(`Please view and adjust the ${step.title} tab before approving, or check 'Keep existing'.`);
          setIsUploading(false);
          return;
        }

        const blob = await createCrop(imageUrl, croppedAreaPixels[step.id]);
        const filePath = `${categoryFolder}/${itemId}/${step.fileName}`;
        
        const { error } = await supabase.storage.from('media').upload(filePath, blob, { 
          upsert: true,
          contentType: 'image/jpeg'
        });
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath);
        urls[step.id] = publicUrl;
      }

      onComplete({
        preview: urls['preview'],
        home: urls['home'],
        highlight: urls['highlight']
      });
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to upload covers to Supabase.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const currentStepIndex = stepsToRender.findIndex(s => s.id === activeTab);
  const currentStepInfo = stepsToRender[currentStepIndex]!;

  const handleNext = () => {
    if (currentStepIndex < stepsToRender.length - 1) {
      setActiveTab(stepsToRender[currentStepIndex + 1].id);
    } else {
      handleApproveAll();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl">
      <div className="w-full h-full flex flex-col max-w-7xl mx-auto p-4 sm:p-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Art Direction Studio</h2>
            <p className="text-neutral-400">Adjust the crops for each device size before approving.</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-all self-end sm:self-auto">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl w-full sm:w-fit mb-4 border border-white/10 overflow-x-auto hide-scrollbar">
          {stepsToRender.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === step.id
                  ? 'bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)] border border-red-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {step.title}
              {(croppedAreaPixels[step.id] || skipCrop[step.id]) && <Check className="w-3 h-3 inline ml-2 text-green-400" />}
            </button>
          ))}
        </div>

        {existingUrls?.[activeTab] && !targetCrop && (
          <div className="mb-4 flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 w-fit">
            <input 
              type="checkbox" 
              id={`skip-${activeTab}`}
              checked={skipCrop[activeTab]} 
              onChange={(e) => setSkipCrop(prev => ({ ...prev, [activeTab]: e.target.checked }))}
              className="w-4 h-4 rounded cursor-pointer accent-red-500"
            />
            <label htmlFor={`skip-${activeTab}`} className="text-sm text-white font-medium cursor-pointer">
              Keep existing {currentStepInfo.title}
            </label>
          </div>
        )}

        {/* Cropper Workspace */}
        <div className={`flex-1 relative bg-black border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-opacity ${skipCrop[activeTab] ? 'opacity-30 pointer-events-none' : ''}`}>
          <Cropper
            image={imageUrl}
            crop={crops[activeTab]}
            zoom={zooms[activeTab]}
            aspect={currentStepInfo.ratio}
            onCropChange={(c) => setCrops(prev => ({ ...prev, [activeTab]: c }))}
            onCropComplete={onCropComplete}
            onZoomChange={(z) => setZooms(prev => ({ ...prev, [activeTab]: z }))}
            classes={{
              containerClassName: 'bg-[#050505]',
              cropAreaClassName: 'border-2 border-red-500/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.8)]'
            }}
          />
        </div>

        {/* Controls */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 bg-white/5 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10">
          <div className="flex items-center gap-4 w-full sm:w-1/3">
            <span className="text-sm font-medium text-neutral-400">Zoom</span>
            <input
              type="range"
              value={zooms[activeTab]}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZooms(prev => ({ ...prev, [activeTab]: Number(e.target.value) }))}
              className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
          </div>

          <button
            onClick={handleNextOrSave}
            disabled={isUploading}
            className="w-full sm:w-auto px-8 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing & Uploading...</span>
              </>
            ) : currentStepIndex < stepsToRender.length - 1 ? (
              <>
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>Done</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
