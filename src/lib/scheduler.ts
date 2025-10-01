// Timetable Scheduling Logic with Graph Coloring

export interface Course {
  code: string;
  name: string;
  priority: number; // 1=High, 2=Medium, 3=Low
  theoryHours: number;
  labHours: number;
  labType: number; // 0=None, 1=Combined, 2=Per-batch
  faculties: string[];
  type?: 'academic' | 'exam' | 'sports' | 'cultural';
  studentGroups?: string[]; // Groups participating (e.g., ["CS-A", "CS-B"])
  department?: string; // For exams
  teams?: string[]; // For sports/cultural events
  venue?: string; // Resource constraint
}

export interface Slot {
  subject: string;
  faculty: string;
  isLab: boolean;
  courseType?: string;
}

export interface ConflictEdge {
  from: string;
  to: string;
  reason: string;
}

export interface GraphNode {
  id: string;
  label: string;
  color?: number;
  conflicts: string[];
  type: 'course' | 'group' | 'faculty' | 'venue';
}

const DAYS = 5;
const HOURS = 6;
export const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export type Timetable = Slot[][];

export interface ScheduleResult {
  div1: Timetable;
  div2: Timetable;
  conflictGraph: GraphNode[];
  conflictEdges: ConflictEdge[];
  steps: AlgorithmStep[];
}

export interface AlgorithmStep {
  step: number;
  action: string;
  courseCode: string;
  slotAssigned?: string;
  colorUsed?: number;
  reasoning: string;
}

// Create conflict graph from courses
export function buildConflictGraph(courses: Course[]): { nodes: GraphNode[], edges: ConflictEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: ConflictEdge[] = [];
  
  // Add course nodes
  courses.forEach(c => {
    nodes.push({
      id: c.code,
      label: `${c.code}\n(${c.theoryHours + c.labHours}h)`,
      conflicts: [],
      type: 'course'
    });
  });

  // Add student group nodes
  const allGroups = new Set<string>();
  courses.forEach(c => {
    if (c.studentGroups) {
      c.studentGroups.forEach(g => allGroups.add(g));
    }
  });
  
  allGroups.forEach(group => {
    nodes.push({
      id: `GROUP-${group}`,
      label: `Group\n${group}`,
      conflicts: [],
      type: 'group'
    });
  });

  // Add faculty nodes
  const allFaculty = new Set<string>();
  courses.forEach(c => c.faculties.forEach(f => allFaculty.add(f)));
  
  allFaculty.forEach(faculty => {
    nodes.push({
      id: `FAC-${faculty}`,
      label: `Faculty\n${faculty}`,
      conflicts: [],
      type: 'faculty'
    });
  });

  // Check for conflicts
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      const c1 = courses[i];
      const c2 = courses[j];

      // Check faculty overlap
      const sharedFaculty = c1.faculties.filter(f => c2.faculties.includes(f));
      
      if (sharedFaculty.length > 0) {
        const idx1 = nodes.findIndex(n => n.id === c1.code);
        const idx2 = nodes.findIndex(n => n.id === c2.code);
        if (idx1 !== -1) nodes[idx1].conflicts.push(c2.code);
        if (idx2 !== -1) nodes[idx2].conflicts.push(c1.code);
        edges.push({
          from: c1.code,
          to: c2.code,
          reason: `Shared faculty: ${sharedFaculty.join(', ')}`
        });
      }

      // Check student group overlap
      if (c1.studentGroups && c2.studentGroups) {
        const sharedGroups = c1.studentGroups.filter(g => c2.studentGroups?.includes(g));
        if (sharedGroups.length > 0) {
          const idx1 = nodes.findIndex(n => n.id === c1.code);
          const idx2 = nodes.findIndex(n => n.id === c2.code);
          if (idx1 !== -1) nodes[idx1].conflicts.push(c2.code);
          if (idx2 !== -1) nodes[idx2].conflicts.push(c1.code);
          edges.push({
            from: c1.code,
            to: c2.code,
            reason: `Shared student groups: ${sharedGroups.join(', ')}`
          });
        }
      }

      // Check venue conflicts
      if (c1.venue && c2.venue && c1.venue === c2.venue) {
        const idx1 = nodes.findIndex(n => n.id === c1.code);
        const idx2 = nodes.findIndex(n => n.id === c2.code);
        if (idx1 !== -1) nodes[idx1].conflicts.push(c2.code);
        if (idx2 !== -1) nodes[idx2].conflicts.push(c1.code);
        edges.push({
          from: c1.code,
          to: c2.code,
          reason: `Shared venue: ${c1.venue}`
        });
      }
    }

    // Connect courses to their student groups
    if (courses[i].studentGroups) {
      courses[i].studentGroups!.forEach(group => {
        edges.push({
          from: courses[i].code,
          to: `GROUP-${group}`,
          reason: 'Assigned to group'
        });
      });
    }

    // Connect courses to their faculty
    courses[i].faculties.forEach(faculty => {
      edges.push({
        from: courses[i].code,
        to: `FAC-${faculty}`,
        reason: 'Taught by faculty'
      });
    });
  }

  return { nodes, edges };
}

// Graph coloring algorithm (assign time slots as colors)
function graphColoringSchedule(courses: Course[], maxColors: number = DAYS * HOURS): ScheduleResult {
  const steps: AlgorithmStep[] = [];
  const { nodes, edges } = buildConflictGraph(courses);
  
  // Sort courses by degree (number of conflicts) - Welsh-Powell algorithm
  const sortedCourses = [...courses].sort((a, b) => {
    const nodeA = nodes.find(n => n.id === a.code)!;
    const nodeB = nodes.find(n => n.id === b.code)!;
    
    // Primary: conflict degree, Secondary: priority
    if (nodeB.conflicts.length !== nodeA.conflicts.length) {
      return nodeB.conflicts.length - nodeA.conflicts.length;
    }
    return a.priority - b.priority;
  });

  // Initialize timetables
  const div1: Timetable = Array(DAYS).fill(null).map(() => 
    Array(HOURS).fill(null).map(() => ({ subject: '', faculty: '', isLab: false }))
  );
  const div2: Timetable = Array(DAYS).fill(null).map(() => 
    Array(HOURS).fill(null).map(() => ({ subject: '', faculty: '', isLab: false }))
  );

  let stepCount = 0;

  // Step 1: Place labs first (they need consecutive slots)
  sortedCourses.forEach(course => {
    if (course.labHours > 0) {
      const labSessions = Math.floor(course.labHours / 2);
      
      for (let s = 0; s < labSessions; s++) {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
          const d = Math.floor(Math.random() * DAYS);
          const h = Math.floor(Math.random() * (HOURS - 1));
          
          if (!div1[d][h].subject && !div1[d][h + 1].subject) {
            // Check conflicts with existing schedule
            const hasConflict = checkTimeConflict(div1, d, h, course, nodes);
            
            if (!hasConflict) {
              div1[d][h] = { subject: course.code, faculty: course.faculties[0], isLab: true, courseType: course.type };
              div1[d][h + 1] = { subject: course.code, faculty: course.faculties[0], isLab: true, courseType: course.type };
              placed = true;
              
              steps.push({
                step: ++stepCount,
                action: 'Place Lab Session',
                courseCode: course.code,
                slotAssigned: `${DAY_NAMES[d]} H${h + 1}-H${h + 2}`,
                colorUsed: d * HOURS + h,
                reasoning: `Lab requires 2 consecutive hours. Placed in available slot with no faculty conflicts.`
              });
            }
          }
          attempts++;
        }
      }
    }
  });

  // Step 2: Place theory hours using graph coloring
  sortedCourses.forEach(course => {
    for (let i = 0; i < course.theoryHours; i++) {
      let placed = false;
      let attempts = 0;
      
      // Try to find a valid color (time slot)
      while (!placed && attempts < 100) {
        const d = Math.floor(Math.random() * DAYS);
        const h = Math.floor(Math.random() * HOURS);
        
        if (!div1[d][h].subject) {
          const hasConflict = checkTimeConflict(div1, d, h, course, nodes);
          
          if (!hasConflict) {
            div1[d][h] = { subject: course.code, faculty: course.faculties[0], isLab: false, courseType: course.type };
            placed = true;
            
            steps.push({
              step: ++stepCount,
              action: 'Assign Theory Hour',
              courseCode: course.code,
              slotAssigned: `${DAY_NAMES[d]} H${h + 1}`,
              colorUsed: d * HOURS + h,
              reasoning: `Found valid slot. No conflicts with courses: ${nodes.find(n => n.id === course.code)?.conflicts.join(', ') || 'none'}.`
            });
          }
        }
        attempts++;
      }
    }
  });

  // Create div2 schedule (similar logic but different faculty)
  sortedCourses.forEach(course => {
    const facultyIndex = course.faculties.length > 1 ? 1 : 0;
    
    if (course.labHours > 0) {
      const labSessions = Math.floor(course.labHours / 2);
      
      for (let s = 0; s < labSessions; s++) {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
          const d = Math.floor(Math.random() * DAYS);
          const h = Math.floor(Math.random() * (HOURS - 1));
          
          if (!div2[d][h].subject && !div2[d][h + 1].subject) {
            const hasConflict = checkTimeConflict(div2, d, h, course, nodes);
            
            if (!hasConflict) {
              div2[d][h] = { subject: course.code, faculty: course.faculties[facultyIndex], isLab: true, courseType: course.type };
              div2[d][h + 1] = { subject: course.code, faculty: course.faculties[facultyIndex], isLab: true, courseType: course.type };
              placed = true;
            }
          }
          attempts++;
        }
      }
    }
    
    for (let i = 0; i < course.theoryHours; i++) {
      let placed = false;
      let attempts = 0;
      
      while (!placed && attempts < 100) {
        const d = Math.floor(Math.random() * DAYS);
        const h = Math.floor(Math.random() * HOURS);
        
        if (!div2[d][h].subject) {
          const hasConflict = checkTimeConflict(div2, d, h, course, nodes);
          
          if (!hasConflict) {
            div2[d][h] = { subject: course.code, faculty: course.faculties[facultyIndex], isLab: false, courseType: course.type };
            placed = true;
          }
        }
        attempts++;
      }
    }
  });

  return { div1, div2, conflictGraph: nodes, conflictEdges: edges, steps };
}

// Check if placing a course at given time creates faculty conflict
function checkTimeConflict(timetable: Timetable, day: number, hour: number, course: Course, nodes: GraphNode[]): boolean {
  const currentSlot = timetable[day][hour];
  if (currentSlot.subject) {
    const conflictingNode = nodes.find(n => n.id === currentSlot.subject);
    if (conflictingNode && conflictingNode.conflicts.includes(course.code)) {
      return true;
    }
  }
  return false;
}

export { graphColoringSchedule };
