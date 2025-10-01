import { Calendar, Network, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-accent to-primary">
      {/* Animated background nodes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-20 h-20 bg-white rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Icon trio */}
          <div className="flex justify-center gap-6 mb-8 animate-fade-in">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Calendar className="w-12 h-12" />
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Network className="w-12 h-12" />
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Brain className="w-12 h-12" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Intelligent Timetable Scheduling
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-white/90 max-w-3xl mx-auto">
            Using Graph Coloring & Discrete Mathematics
          </p>

          <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto">
            Generate conflict-free schedules for academics, exams, sports, and cultural events. 
            Visualize the algorithm as it solves complex scheduling problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl shadow-2xl hover:scale-105 transition-transform"
            >
              Generate Schedule Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('theory')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-xl"
            >
              Learn the Math
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-white/80">Conflict-Free</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">&lt;1s</div>
              <div className="text-sm text-white/80">Generation Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl font-bold mb-2">4+</div>
              <div className="text-sm text-white/80">Schedule Types</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
