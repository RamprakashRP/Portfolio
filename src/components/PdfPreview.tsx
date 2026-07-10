'use client';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker from unpkg to avoid Next.js build issues
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  file: string;
  isCertificate?: boolean;
}

export default function PdfPreview({ file, isCertificate }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number>();
  const [error, setError] = useState<boolean>(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError() {
    setError(true);
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 relative">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="text-[9px] font-black tracking-widest text-white/50 bg-white/10 px-2 py-0.5 rounded-full uppercase">
          PDF
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-white">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        className="flex items-center justify-center w-full h-full"
        loading={
          <div className="flex space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
            <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
            <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
          </div>
        }
      >
        <Page 
          pageNumber={1} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className={`transition-all duration-300 ${isCertificate ? 'scale-125' : 'scale-[1.02]'}`}
          width={300} // Force a fixed rendering width to maintain crispness
        />
      </Document>
    </div>
  );
}
