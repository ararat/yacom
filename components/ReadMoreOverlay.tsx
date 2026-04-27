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
      <div className="absolute inset-0 bg-gradient-to-t from-obs-surface via-obs-surface/90 to-transparent" />
      
      {/* Read More Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <button
          onClick={onContinueReading}
          className="px-4 py-2 bg-obs-raised border border-violet-mid rounded-lg hover:bg-violet-dim transition-all duration-200 text-sm font-medium text-violet-glow hover:text-white"
        >
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default ReadMoreOverlay;