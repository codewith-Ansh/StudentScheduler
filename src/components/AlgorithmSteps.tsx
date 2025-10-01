import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlgorithmStep } from '@/lib/scheduler';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

interface AlgorithmStepsProps {
  steps: AlgorithmStep[];
}

export const AlgorithmSteps = ({ steps }: AlgorithmStepsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed] = useState(1000);

  const handlePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
    setIsPlaying(false);
  };

  const handleNext = () => {
    setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
    setIsPlaying(false);
  };

  // Auto-advance when playing
  useState(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, playbackSpeed);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  });

  if (steps.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-muted-foreground">Generate a schedule to see algorithm steps</p>
      </Card>
    );
  }

  const step = steps[currentStep];

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6">Algorithm Visualization</h3>
      
      {/* Controls */}
      <div className="flex items-center justify-between mb-6 p-4 bg-muted rounded-lg">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {!isPlaying ? (
            <Button size="sm" onClick={handlePlay}>
              <Play className="w-4 h-4 mr-2" />
              Play
            </Button>
          ) : (
            <Button size="sm" onClick={handlePause}>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button size="sm" variant="outline" onClick={handleNext} disabled={currentStep === steps.length - 1}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Current Step Display */}
      <div className="space-y-4">
        <div className="p-6 bg-primary/5 border-l-4 border-primary rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              {step.step}
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-1">{step.action}</div>
              <div className="text-2xl font-bold mb-2">{step.courseCode}</div>
              {step.slotAssigned && (
                <div className="text-lg mb-2">
                  <span className="text-muted-foreground">Assigned to:</span>{' '}
                  <span className="font-semibold text-accent">{step.slotAssigned}</span>
                </div>
              )}
              {step.colorUsed !== undefined && (
                <div className="text-sm text-muted-foreground mb-2">
                  Color/Slot Number: {step.colorUsed}
                </div>
              )}
              <div className="text-sm mt-3 p-3 bg-card rounded border border-border">
                <strong>Reasoning:</strong> {step.reasoning}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* All steps summary */}
        <details className="mt-6">
          <summary className="cursor-pointer font-semibold text-sm text-muted-foreground hover:text-foreground">
            View all {steps.length} steps
          </summary>
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  i === currentStep
                    ? 'bg-primary/10 border-primary'
                    : 'bg-card border-border hover:bg-muted/50'
                }`}
                onClick={() => {
                  setCurrentStep(i);
                  setIsPlaying(false);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-sm">{s.step}. {s.courseCode}</span>
                    <span className="text-xs text-muted-foreground ml-2">{s.action}</span>
                  </div>
                  {s.slotAssigned && (
                    <div className="text-xs text-accent font-semibold">
                      {s.slotAssigned}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </Card>
  );
};
