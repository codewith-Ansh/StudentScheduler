import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AcademicFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
}

export const AcademicFields = ({ formData, setFormData }: AcademicFieldsProps) => (
  <>
    <div>
      <Label htmlFor="code">Course Code *</Label>
      <Input
        id="code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        placeholder="e.g., CS101"
        required
      />
    </div>
    <div>
      <Label htmlFor="name">Course Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Data Structures"
        required
      />
    </div>
    <div>
      <Label htmlFor="studentGroups">Student Groups (comma-separated) *</Label>
      <Input
        id="studentGroups"
        value={formData.studentGroupsText || ''}
        onChange={(e) => setFormData({ ...formData, studentGroupsText: e.target.value })}
        placeholder="e.g., CS-A, CS-B, IT-A"
        required
      />
    </div>
    <div>
      <Label htmlFor="faculties">Faculties (comma-separated) *</Label>
      <Input
        id="faculties"
        value={formData.facultiesText || ''}
        onChange={(e) => setFormData({ ...formData, facultiesText: e.target.value })}
        placeholder="e.g., Prof. Smith, Dr. Johnson"
        required
      />
    </div>
    <div>
      <Label htmlFor="theoryHours">Theory Hours *</Label>
      <Input
        id="theoryHours"
        type="number"
        min="0"
        max="10"
        value={formData.theoryHours}
        onChange={(e) => setFormData({ ...formData, theoryHours: parseInt(e.target.value) || 0 })}
        required
      />
    </div>
    <div>
      <Label htmlFor="labHours">Lab Hours</Label>
      <Input
        id="labHours"
        type="number"
        min="0"
        max="10"
        value={formData.labHours}
        onChange={(e) => setFormData({ ...formData, labHours: parseInt(e.target.value) || 0 })}
      />
    </div>
    <div>
      <Label htmlFor="priority">Priority *</Label>
      <Select value={formData.priority.toString()} onValueChange={(v) => setFormData({ ...formData, priority: parseInt(v) })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">High</SelectItem>
          <SelectItem value="2">Medium</SelectItem>
          <SelectItem value="3">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <Label htmlFor="venue">Venue/Room</Label>
      <Input
        id="venue"
        value={formData.venue || ''}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
        placeholder="e.g., Lab 101"
      />
    </div>
  </>
);

export const ExamFields = ({ formData, setFormData }: AcademicFieldsProps) => (
  <>
    <div>
      <Label htmlFor="code">Exam Code *</Label>
      <Input
        id="code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        placeholder="e.g., DM-MID"
        required
      />
    </div>
    <div>
      <Label htmlFor="name">Exam Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Discrete Math Midterm"
        required
      />
    </div>
    <div>
      <Label htmlFor="department">Department *</Label>
      <Input
        id="department"
        value={formData.department || ''}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        placeholder="e.g., Computer Science"
        required
      />
    </div>
    <div>
      <Label htmlFor="studentGroups">Student Groups (comma-separated) *</Label>
      <Input
        id="studentGroups"
        value={formData.studentGroupsText || ''}
        onChange={(e) => setFormData({ ...formData, studentGroupsText: e.target.value })}
        placeholder="e.g., CS-A, CS-B"
        required
      />
    </div>
    <div>
      <Label htmlFor="duration">Duration (hours) *</Label>
      <Input
        id="duration"
        type="number"
        min="1"
        max="4"
        value={formData.theoryHours}
        onChange={(e) => setFormData({ ...formData, theoryHours: parseInt(e.target.value) || 2 })}
        required
      />
    </div>
    <div>
      <Label htmlFor="venue">Exam Hall *</Label>
      <Input
        id="venue"
        value={formData.venue || ''}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
        placeholder="e.g., Main Hall"
        required
      />
    </div>
    <div>
      <Label htmlFor="faculties">Invigilators (comma-separated) *</Label>
      <Input
        id="faculties"
        value={formData.facultiesText || ''}
        onChange={(e) => setFormData({ ...formData, facultiesText: e.target.value })}
        placeholder="e.g., Prof. Smith, Dr. Johnson"
        required
      />
    </div>
    <div>
      <Label htmlFor="priority">Priority *</Label>
      <Select value={formData.priority.toString()} onValueChange={(v) => setFormData({ ...formData, priority: parseInt(v) })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">High</SelectItem>
          <SelectItem value="2">Medium</SelectItem>
          <SelectItem value="3">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);

export const SportsFields = ({ formData, setFormData }: AcademicFieldsProps) => (
  <>
    <div>
      <Label htmlFor="code">Match/Event Code *</Label>
      <Input
        id="code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        placeholder="e.g., FB-SF"
        required
      />
    </div>
    <div>
      <Label htmlFor="name">Match/Event Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Football Semi-Final"
        required
      />
    </div>
    <div>
      <Label htmlFor="teams">Teams (comma-separated) *</Label>
      <Input
        id="teams"
        value={formData.teamsText || ''}
        onChange={(e) => setFormData({ ...formData, teamsText: e.target.value })}
        placeholder="e.g., Team A, Team B"
        required
      />
    </div>
    <div>
      <Label htmlFor="studentGroups">Student Groups Participating (comma-separated)</Label>
      <Input
        id="studentGroups"
        value={formData.studentGroupsText || ''}
        onChange={(e) => setFormData({ ...formData, studentGroupsText: e.target.value })}
        placeholder="e.g., CS-A, IT-B"
      />
    </div>
    <div>
      <Label htmlFor="venue">Venue *</Label>
      <Input
        id="venue"
        value={formData.venue || ''}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
        placeholder="e.g., Football Ground"
        required
      />
    </div>
    <div>
      <Label htmlFor="duration">Duration (hours) *</Label>
      <Input
        id="duration"
        type="number"
        min="1"
        max="6"
        value={formData.labHours}
        onChange={(e) => setFormData({ ...formData, labHours: parseInt(e.target.value) || 2 })}
        required
      />
    </div>
    <div>
      <Label htmlFor="faculties">Coaches/Coordinators (comma-separated) *</Label>
      <Input
        id="faculties"
        value={formData.facultiesText || ''}
        onChange={(e) => setFormData({ ...formData, facultiesText: e.target.value })}
        placeholder="e.g., Coach Smith"
        required
      />
    </div>
    <div>
      <Label htmlFor="priority">Priority *</Label>
      <Select value={formData.priority.toString()} onValueChange={(v) => setFormData({ ...formData, priority: parseInt(v) })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">High</SelectItem>
          <SelectItem value="2">Medium</SelectItem>
          <SelectItem value="3">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);

export const CulturalFields = ({ formData, setFormData }: AcademicFieldsProps) => (
  <>
    <div>
      <Label htmlFor="code">Event Code *</Label>
      <Input
        id="code"
        value={formData.code}
        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
        placeholder="e.g., MUS-1"
        required
      />
    </div>
    <div>
      <Label htmlFor="name">Event Name *</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="e.g., Annual Music Competition"
        required
      />
    </div>
    <div>
      <Label htmlFor="teams">Participating Groups (comma-separated) *</Label>
      <Input
        id="teams"
        value={formData.teamsText || ''}
        onChange={(e) => setFormData({ ...formData, teamsText: e.target.value })}
        placeholder="e.g., Music Club, Drama Club"
        required
      />
    </div>
    <div>
      <Label htmlFor="studentGroups">Student Groups (comma-separated)</Label>
      <Input
        id="studentGroups"
        value={formData.studentGroupsText || ''}
        onChange={(e) => setFormData({ ...formData, studentGroupsText: e.target.value })}
        placeholder="e.g., CS-A, EC-B"
      />
    </div>
    <div>
      <Label htmlFor="venue">Venue *</Label>
      <Input
        id="venue"
        value={formData.venue || ''}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
        placeholder="e.g., Main Auditorium"
        required
      />
    </div>
    <div>
      <Label htmlFor="duration">Duration (hours) *</Label>
      <Input
        id="duration"
        type="number"
        min="1"
        max="8"
        value={formData.labHours}
        onChange={(e) => setFormData({ ...formData, labHours: parseInt(e.target.value) || 2 })}
        required
      />
    </div>
    <div>
      <Label htmlFor="faculties">Coordinators (comma-separated) *</Label>
      <Input
        id="faculties"
        value={formData.facultiesText || ''}
        onChange={(e) => setFormData({ ...formData, facultiesText: e.target.value })}
        placeholder="e.g., Dr. Anderson"
        required
      />
    </div>
    <div>
      <Label htmlFor="priority">Priority *</Label>
      <Select value={formData.priority.toString()} onValueChange={(v) => setFormData({ ...formData, priority: parseInt(v) })}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">High</SelectItem>
          <SelectItem value="2">Medium</SelectItem>
          <SelectItem value="3">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </>
);