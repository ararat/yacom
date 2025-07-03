import React from 'react';
import { OVERLAY_HEIGHT_RATIO } from '../lib/constants';

interface ReadMoreOverlayProps {
  availableHeight: number;
  onContinueReading: () => void;
}

const ReadMoreOverlay: React.FC<ReadMoreOverlayProps> = ({ 
  availableHeight, 
  onContinueReading 
}) => {
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ height: `${availableHeight * OVERLAY_HEIGHT_RATIO}px` }}
    >
      {/* Blur Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent backdrop-blur-sm" />
      
      {/* Read More Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <button
          onClick={onContinueReading}
          className="px-4 py-2 bg-white/95 backdrop-blur border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium text-gray-700"
        >
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default ReadMoreOverlay;