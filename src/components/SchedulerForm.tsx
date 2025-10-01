import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Course } from '@/lib/scheduler';
import { Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

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
    priority: '1',
    theoryHours: '0',
    labHours: '0',
    labType: '0',
    faculties: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.code || !formData.name || !formData.faculties) {
      toast.error('Please fill in all required fields');
      return;
    }

    const facultyList = formData.faculties.split(',').map(f => f.trim()).filter(f => f);
    
    if (facultyList.length === 0) {
      toast.error('Please add at least one faculty');
      return;
    }

    const course: Course = {
      code: formData.code,
      name: formData.name,
      priority: parseInt(formData.priority),
      theoryHours: parseInt(formData.theoryHours),
      labHours: parseInt(formData.labHours),
      labType: parseInt(formData.labType),
      faculties: facultyList,
      type: scheduleType as any
    };

    onAddCourse(course);
    setFormData({
      code: '',
      name: '',
      priority: '1',
      theoryHours: '0',
      labHours: '0',
      labType: '0',
      faculties: ''
    });
    toast.success(`Added ${course.code} to schedule`);
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
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Course/Event Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={e => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., DM, CS101"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Discrete Mathematics"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={v => setFormData({ ...formData, priority: v })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - High</SelectItem>
                  <SelectItem value="2">2 - Medium</SelectItem>
                  <SelectItem value="3">3 - Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="theoryHours">Theory/Session Hours</Label>
              <Input
                id="theoryHours"
                type="number"
                min="0"
                value={formData.theoryHours}
                onChange={e => setFormData({ ...formData, theoryHours: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="labHours">Lab/Practice Hours</Label>
              <Input
                id="labHours"
                type="number"
                min="0"
                value={formData.labHours}
                onChange={e => setFormData({ ...formData, labHours: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="labType">Lab Type</Label>
              <Select value={formData.labType} onValueChange={v => setFormData({ ...formData, labType: v })}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">Combined</SelectItem>
                  <SelectItem value="2">Per-batch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="faculties">Faculty/Instructor Names * (comma-separated)</Label>
            <Input
              id="faculties"
              value={formData.faculties}
              onChange={e => setFormData({ ...formData, faculties: e.target.value })}
              placeholder="e.g., Prof. Smith, Prof. Johnson"
              className="mt-2"
            />
          </div>

          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add to Schedule
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
                    Priority: {course.priority} | Theory: {course.theoryHours}h | Lab: {course.labHours}h | Faculty: {course.faculties.join(', ')}
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
