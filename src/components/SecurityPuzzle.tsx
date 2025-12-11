import { useState, useRef } from 'react';
import { X, RefreshCw, ChevronRight } from 'lucide-react';

interface SecurityPuzzleProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
}

const SecurityPuzzle = ({ isOpen, onClose, onVerify }: SecurityPuzzleProps) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Target position (where the puzzle piece should land)
  const targetPosition = 75; // percentage
  const tolerance = 5; // percentage tolerance

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Check if slider is near target
    if (Math.abs(sliderPosition - targetPosition) <= tolerance) {
      setIsVerified(true);
      setTimeout(() => {
        onVerify();
        onClose();
        resetPuzzle();
      }, 500);
    } else {
      // Reset if wrong
      setSliderPosition(0);
    }
  };

  const resetPuzzle = () => {
    setSliderPosition(0);
    setIsVerified(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchEnd = handleMouseUp;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-foreground/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-card/80 flex items-center justify-center hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-6">
          {/* Header */}
          <h3 className="text-xl font-bold text-center mb-6 text-foreground">
            Quick Verification
          </h3>

          {/* Puzzle Image Area */}
          <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/20 to-accent/20">
            <div className="aspect-[2/1] relative">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-30">
                <div className="grid grid-cols-8 grid-rows-4 h-full">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div 
                      key={i}
                      className="border border-primary/20"
                      style={{
                        background: `hsl(${(i * 10) % 360}, 60%, 70%)`,
                        opacity: 0.3
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Target outline (where piece should go) */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-12 h-12 border-2 border-dashed border-primary/50 rounded-lg"
                style={{ left: `${targetPosition}%`, transform: `translateX(-50%) translateY(-50%)` }}
              />

              {/* Draggable puzzle piece */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-lg shadow-lg cursor-grab active:cursor-grabbing transition-all ${
                  isVerified ? 'bg-green-500 scale-110' : 'bg-primary'
                }`}
                style={{ 
                  left: `${sliderPosition}%`, 
                  transform: `translateX(-50%) translateY(-50%)`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {isVerified ? (
                    <span className="text-white text-xl">✓</span>
                  ) : (
                    <div className="w-6 h-6 border-2 border-primary-foreground/50 rounded" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="relative h-12 bg-muted rounded-full cursor-pointer select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Progress fill */}
            <div 
              className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                isVerified ? 'bg-green-500' : 'bg-primary/20'
              }`}
              style={{ width: `${sliderPosition}%` }}
            />

            {/* Slider handle */}
            <div
              className={`absolute top-1 left-0 w-10 h-10 rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors ${
                isVerified ? 'bg-green-500' : 'bg-primary'
              }`}
              style={{ left: `calc(${sliderPosition}% - ${sliderPosition * 0.4}px)` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
              <ChevronRight className="w-5 h-5 text-primary-foreground -ml-3" />
            </div>

            {/* Hint text */}
            {sliderPosition < 10 && (
              <span className="absolute left-14 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                Drag to complete puzzle
              </span>
            )}
          </div>

          {/* Refresh button */}
          <button
            onClick={resetPuzzle}
            className="flex items-center gap-2 mx-auto mt-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPuzzle;
