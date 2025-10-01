import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { TheorySection } from '@/components/TheorySection';
import { AboutSection } from '@/components/AboutSection';
import { SchedulerForm } from '@/components/SchedulerForm';
import { ConflictGraph } from '@/components/ConflictGraph';
import { TimetableView } from '@/components/TimetableView';
import { AlgorithmSteps } from '@/components/AlgorithmSteps';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course, ScheduleResult, graphColoringSchedule } from '@/lib/scheduler';
import { demoCourses, getScheduleTypeData } from '@/lib/demoData';
import { Sparkles, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult | null>(null);
  const [scheduleType, setScheduleType] = useState<string>('academic');
  const [showScheduler, setShowScheduler] = useState(false);

  const handleAddCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
    toast.success('Course removed');
  };

  const handleLoadDemo = () => {
    const demoData = getScheduleTypeData(scheduleType);
    setCourses(demoData);
    toast.success(`Loaded ${demoData.length} demo ${scheduleType} courses`);
  };

  const handleClearAll = () => {
    setCourses([]);
    setScheduleResult(null);
    toast.success('Cleared all data');
  };

  const handleGenerate = () => {
    if (courses.length === 0) {
      toast.error('Please add at least one course');
      return;
    }

    const result = graphColoringSchedule(courses);
    setScheduleResult(result);
    toast.success('Schedule generated successfully!');
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onGetStarted={() => {
        setShowScheduler(true);
        setTimeout(() => {
          document.getElementById('scheduler')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }} />

      {/* Scheduler Section */}
      {showScheduler && (
        <section id="scheduler" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Create Your Schedule
                </h2>
                <p className="text-xl text-muted-foreground">
                  Add courses and generate conflict-free timetables
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <SchedulerForm
                  courses={courses}
                  onAddCourse={handleAddCourse}
                  onRemoveCourse={handleRemoveCourse}
                  onLoadDemo={handleLoadDemo}
                  onClearAll={handleClearAll}
                  scheduleType={scheduleType}
                  onScheduleTypeChange={setScheduleType}
                />

                <ConflictGraph
                  nodes={scheduleResult?.conflictGraph || []}
                  edges={scheduleResult?.conflictEdges || []}
                />
              </div>

              {courses.length > 0 && (
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    className="px-12 py-6 text-lg animate-pulse-glow"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Timetable
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {scheduleResult && (
        <section id="results" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Generated Schedules
                </h2>
                <p className="text-xl text-muted-foreground">
                  {scheduleType === 'sports' 
                    ? 'Conflict-free sports event schedules'
                    : 'Conflict-free timetables for both divisions'
                  }
                </p>
              </div>

              <Tabs defaultValue="timetables" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                  <TabsTrigger value="timetables">Timetables</TabsTrigger>
                  <TabsTrigger value="algorithm">Algorithm</TabsTrigger>
                </TabsList>

                <TabsContent value="timetables" className="space-y-8">
                  {scheduleType === 'sports' ? (
                    // Combined sports timetable
                    <TimetableView 
                      division="Inter-Department Tournament" 
                      timetable={scheduleResult.div1}
                      scheduleType={scheduleType}
                    />
                  ) : (
                    // Division-wise timetables for academic/exam/cultural
                    <>
                      <TimetableView division="Division 1" timetable={scheduleResult.div1} scheduleType={scheduleType} />
                      <TimetableView division="Division 2" timetable={scheduleResult.div2} scheduleType={scheduleType} />
                    </>
                  )}
                </TabsContent>

                <TabsContent value="algorithm">
                  <AlgorithmSteps steps={scheduleResult.steps} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
      )}

      {/* Theory Section */}
      <TheorySection />

      {/* About Section */}
      <AboutSection />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Index;
