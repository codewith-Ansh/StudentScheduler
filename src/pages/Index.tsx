import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { TheorySection } from '@/components/TheorySection';
import { AboutSection } from '@/components/AboutSection';
import { SchedulerForm } from '@/components/SchedulerForm';
import { ConflictGraph } from '@/components/ConflictGraph';
import { TimetableView } from '@/components/TimetableView';
import { AlgorithmSteps } from '@/components/AlgorithmSteps';
import { AlgorithmComparison } from '@/components/AlgorithmComparison';
import { SetTheoryAnalysis } from '@/components/SetTheoryAnalysis';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course, ScheduleResult, graphColoringSchedule } from '@/lib/scheduler';
import { demoCourses, getScheduleTypeData } from '@/lib/demoData';
import { Sparkles, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult | null>(null);
  const [scheduleType, setScheduleType] = useState<string>('academic');
  // Algorithm selection state - determines which graph coloring algorithm to use
  // Default: Welsh-Powell (balanced approach suitable for most cases)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('welshPowell');
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

  /**
   * SCHEDULE GENERATION HANDLER
   * 
   * Orchestrates the timetable generation process:
   * 1. Validates input (at least one course required)
   * 2. Calls selected graph coloring algorithm
   * 3. Updates UI with results
   * 4. Provides user feedback
   * 
   * Parameters passed to algorithm:
   * - courses: Input data to schedule
   * - 30: Maximum time slots (5 days × 6 hours)
   * - algorithm: User-selected algorithm type
   */
  const handleGenerate = () => {
    if (courses.length === 0) {
      toast.error('Please add at least one course');
      return;
    }

    // Execute all graph coloring algorithms for comparison
    const result = graphColoringSchedule(courses, 30);
    setScheduleResult(result);
    toast.success(`All algorithms executed! Recommended: ${result.comparison.recommended}`);
    
    // Auto-scroll to results section
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-16">
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
                    ? 'Conflict-free sports event schedules with algorithm comparison'
                    : `Conflict-free timetables with algorithm comparison (Recommended: ${scheduleResult.comparison.recommended})`
                  }
                </p>
              </div>

              <Tabs defaultValue="timetables" className="space-y-8">
                <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
                  <TabsTrigger value="timetables">Timetables</TabsTrigger>
                  <TabsTrigger value="comparison">Algorithm Comparison</TabsTrigger>
                  <TabsTrigger value="set-theory">Set Theory</TabsTrigger>
                  <TabsTrigger value="algorithm">Algorithm Steps</TabsTrigger>
                </TabsList>

                <TabsContent value="timetables" className="space-y-8">
                  {scheduleType === 'sports' ? (
                    // Combined sports timetable
                    <TimetableView 
                      division="Inter-Department Tournament" 
                      timetable={scheduleResult.algorithms.welshPowell.div1}
                      scheduleType={scheduleType}
                    />
                  ) : scheduleType === 'exam' ? (
                    // University-wide examination schedule
                    <>
                      <div className="mb-4">
                        <Label>View Algorithm Results:</Label>
                        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                          <SelectTrigger className="mt-2 max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="welshPowell">Welsh-Powell</SelectItem>
                            <SelectItem value="greedy">Greedy</SelectItem>
                            <SelectItem value="dsatur">DSATUR</SelectItem>
                            <SelectItem value="backtracking">Backtracking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TimetableView 
                        division={`University Examination Schedule - ${scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].algorithmName}`} 
                        timetable={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].div1} 
                        scheduleType={scheduleType} 
                      />
                    </>
                  ) : scheduleType === 'cultural' ? (
                    // University-wide cultural events schedule
                    <>
                      <div className="mb-4">
                        <Label>View Algorithm Results:</Label>
                        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                          <SelectTrigger className="mt-2 max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="welshPowell">Welsh-Powell</SelectItem>
                            <SelectItem value="greedy">Greedy</SelectItem>
                            <SelectItem value="dsatur">DSATUR</SelectItem>
                            <SelectItem value="backtracking">Backtracking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TimetableView 
                        division={`University Cultural Events Schedule - ${scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].algorithmName}`} 
                        timetable={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].div1} 
                        scheduleType={scheduleType} 
                      />
                    </>
                  ) : (
                    // Academic courses - show both divisions
                    <>
                      <div className="mb-4">
                        <Label>View Algorithm Results:</Label>
                        <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                          <SelectTrigger className="mt-2 max-w-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="welshPowell">Welsh-Powell</SelectItem>
                            <SelectItem value="greedy">Greedy</SelectItem>
                            <SelectItem value="dsatur">DSATUR</SelectItem>
                            <SelectItem value="backtracking">Backtracking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <TimetableView 
                        division={`Division 1 - ${scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].algorithmName}`} 
                        timetable={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].div1} 
                        scheduleType={scheduleType} 
                      />
                      <TimetableView 
                        division={`Division 2 - ${scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].algorithmName}`} 
                        timetable={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].div2} 
                        scheduleType={scheduleType} 
                      />
                    </>
                  )}
                </TabsContent>

                <TabsContent value="set-theory">
                  <SetTheoryAnalysis 
                    nodes={scheduleResult?.conflictGraph || []} 
                    edges={scheduleResult?.conflictEdges || []} 
                  />
                </TabsContent>

                <TabsContent value="comparison">
                  <AlgorithmComparison 
                    algorithms={scheduleResult.algorithms}
                    comparison={scheduleResult.comparison}
                  />
                </TabsContent>

                <TabsContent value="algorithm">
                  <AlgorithmSteps 
                    steps={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].steps} 
                    algorithmUsed={scheduleResult.algorithms[selectedAlgorithm as keyof typeof scheduleResult.algorithms].algorithmName}
                  />
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
