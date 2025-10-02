import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course } from '@/lib/scheduler';
import { Plus, Trash2, Upload, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AcademicFields, ExamFields, SportsFields, CulturalFields } from './SchedulerFormFields';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SchedulerFormProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onRemoveCourse: (index: number) => void;
  onLoadDemo: () => void;
  onClearAll: () => void;
  scheduleType: string;
  onScheduleTypeChange: (type: string) => void;
}

export const SchedulerForm = ({
  courses,
  onAddCourse,
  onRemoveCourse,
  onLoadDemo,
  onClearAll,
  scheduleType,
  onScheduleTypeChange
}: SchedulerFormProps) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    priority: 1,
    theoryHours: 3,
    labHours: 0,
    labType: 0,
    faculties: [] as string[],
    facultiesText: '',
    studentGroups: [] as string[],
    studentGroupsText: '',
    teams: [] as string[],
    teamsText: '',
    department: '',
    venue: '',
    type: scheduleType as 'academic' | 'exam' | 'sports' | 'cultural'
  });
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    setFormData(prev => ({ ...prev, type: scheduleType as any }));
  }, [scheduleType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    // Validate based on schedule type
    if (!formData.code || !formData.name) {
      setValidationError('Course code and name are required');
      return;
    }

    // Check for duplicate course codes
    if (courses.some(c => c.code === formData.code)) {
      setValidationError(`Course code "${formData.code}" already exists`);
      return;
    }

    const faculties = formData.facultiesText.split(',').map(f => f.trim()).filter(Boolean);
    const studentGroups = formData.studentGroupsText.split(',').map(g => g.trim()).filter(Boolean);
    const teams = formData.teamsText.split(',').map(t => t.trim()).filter(Boolean);

    if (faculties.length === 0) {
      setValidationError('At least one faculty/coordinator is required');
      return;
    }

    // Type-specific validation
    if (scheduleType === 'academic' && studentGroups.length === 0) {
      setValidationError('At least one student group is required for academic courses');
      return;
    }

    if (scheduleType === 'exam' && (!formData.venue || !formData.department)) {
      setValidationError('Venue and department are required for exams');
      return;
    }

    if ((scheduleType === 'sports' || scheduleType === 'cultural') && !formData.venue) {
      setValidationError('Venue is required for sports/cultural events');
      return;
    }

    if (formData.theoryHours + formData.labHours === 0) {
      setValidationError('Total hours must be greater than 0');
      return;
    }

    if (formData.theoryHours + formData.labHours > 10) {
      setValidationError('Total hours cannot exceed 10');
      return;
    }

    const course: Course = {
      code: formData.code,
      name: formData.name,
      priority: formData.priority,
      theoryHours: formData.theoryHours,
      labHours: formData.labHours,
      labType: formData.labType,
      faculties,
      type: scheduleType as any,
      studentGroups: studentGroups.length > 0 ? studentGroups : undefined,
      teams: teams.length > 0 ? teams : undefined,
      department: formData.department || undefined,
      venue: formData.venue || undefined
    };

    onAddCourse(course);
    toast.success(`${scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)} added successfully!`);
    
    // Reset form
    setFormData({
      code: '',
      name: '',
      priority: 1,
      theoryHours: scheduleType === 'academic' ? 3 : 2,
      labHours: 0,
      labType: 0,
      faculties: [],
      facultiesText: '',
      studentGroups: [],
      studentGroupsText: '',
      teams: [],
      teamsText: '',
      department: '',
      venue: '',
      type: scheduleType as any
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Schedule Configuration</h3>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onLoadDemo} size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Load Demo
            </Button>
            <Button variant="outline" onClick={onClearAll} size="sm">
              Clear All
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Label>Schedule Type</Label>
          <Select value={scheduleType} onValueChange={onScheduleTypeChange}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic Courses</SelectItem>
              <SelectItem value="exam">Examinations</SelectItem>
              <SelectItem value="sports">Sports Events</SelectItem>
              <SelectItem value="cultural">Cultural Events</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            All four graph coloring algorithms will be executed for comparison
          </p>
        </div>

        {validationError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 h-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {scheduleType === 'academic' && <AcademicFields formData={formData} setFormData={setFormData} />}
            {scheduleType === 'exam' && <ExamFields formData={formData} setFormData={setFormData} />}
            {scheduleType === 'sports' && <SportsFields formData={formData} setFormData={setFormData} />}
            {scheduleType === 'cultural' && <CulturalFields formData={formData} setFormData={setFormData} />}
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add {scheduleType.charAt(0).toUpperCase() + scheduleType.slice(1)}
          </Button>
        </form>
      </Card>

      {courses.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Added Courses ({courses.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {courses.map((course, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-bold">{course.code} - {course.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.studentGroups && `Groups: ${course.studentGroups.join(', ')} | `}
                    {course.department && `Dept: ${course.department} | `}
                    {course.teams && `Teams: ${course.teams.join(', ')} | `}
                    {course.venue && `Venue: ${course.venue} | `}
                    Hours: {course.theoryHours + course.labHours}h
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onRemoveCourse(index)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
