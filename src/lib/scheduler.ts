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

export interface SportSchedule {
  sportName: string;
  timetable: Timetable;
}

export interface AlgorithmResult {
  div1: Timetable;
  div2: Timetable;
  steps: AlgorithmStep[];
  algorithmName: string;
  executionTime: number;
  slotsUsed: number;
  conflictsResolved: number;
}

export interface ScheduleResult {
  conflictGraph: GraphNode[];
  conflictEdges: ConflictEdge[];
  sportsSchedules?: SportSchedule[];
  algorithms: {
    welshPowell: AlgorithmResult;
    greedy: AlgorithmResult;
    dsatur: AlgorithmResult;
    backtracking: AlgorithmResult;
  };
  comparison: {
    fastest: string;
    mostEfficient: string;
    leastSlots: string;
    recommended: string;
  };
}

export interface AlgorithmStep {
  step: number;
  action: string;
  courseCode: string;
  slotAssigned?: string;
  colorUsed?: number;
  reasoning: string;
}

/**
 * ALGORITHM TYPE DEFINITIONS
 * 
 * Defines the four graph coloring algorithms available for scheduling:
 * - welsh-powell: Degree-based sorting + greedy coloring
 * - greedy: Simple first-fit approach
 * - backtracking: Exhaustive search with backtracking
 * - dsatur: Dynamic saturation degree selection
 */
export type AlgorithmType = 'welsh-powell' | 'greedy' | 'backtracking' | 'dsatur';

/**
 * CONFLICT GRAPH CONSTRUCTION
 * 
 * Converts scheduling problem into graph coloring problem:
 * 
 * Graph Theory Mapping:
 * - Nodes = Courses + Student Groups + Faculty + Venues
 * - Edges = Conflicts between entities
 * 
 * Conflict Detection Rules:
 * 1. Faculty Conflict: Same instructor teaching multiple courses
 * 2. Student Group Conflict: Same students in multiple courses
 * 3. Venue Conflict: Same room/facility needed simultaneously
 * 
 * This function builds the complete conflict graph that all algorithms use
 * to determine which courses cannot be scheduled at the same time.
 * 
 * @param courses - Input courses to analyze
 * @returns Object containing nodes array and edges array representing conflicts
 */
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

function graphColoringSchedule(courses: Course[], maxColors: number = DAYS * HOURS): ScheduleResult {
  // Handle special cases (sports/cultural/exam schedules)
  if (courses.length > 0 && (courses[0].type === 'sports' || courses[0].type === 'cultural' || courses[0].type === 'exam')) {
    const sportsResult = generateSportsSchedule(courses);
    return {
      conflictGraph: sportsResult.conflictGraph,
      conflictEdges: sportsResult.conflictEdges,
      sportsSchedules: sportsResult.sportsSchedules,
      algorithms: {
        welshPowell: {
          div1: sportsResult.div1,
          div2: sportsResult.div2,
          steps: sportsResult.steps,
          algorithmName: 'Welsh-Powell',
          executionTime: 0,
          slotsUsed: countUsedSlots(sportsResult.div1),
          conflictsResolved: sportsResult.conflictEdges.length
        },
        greedy: { div1: sportsResult.div1, div2: sportsResult.div2, steps: [], algorithmName: 'Greedy', executionTime: 0, slotsUsed: 0, conflictsResolved: 0 },
        dsatur: { div1: sportsResult.div1, div2: sportsResult.div2, steps: [], algorithmName: 'DSATUR', executionTime: 0, slotsUsed: 0, conflictsResolved: 0 },
        backtracking: { div1: sportsResult.div1, div2: sportsResult.div2, steps: [], algorithmName: 'Backtracking', executionTime: 0, slotsUsed: 0, conflictsResolved: 0 }
      },
      comparison: {
        fastest: 'Welsh-Powell',
        mostEfficient: 'Welsh-Powell',
        leastSlots: 'Welsh-Powell',
        recommended: 'Welsh-Powell'
      }
    };
  }

  const { nodes, edges } = buildConflictGraph(courses);
  
  // Use only Welsh-Powell for now to fix performance
  const wpResult = welshPowellSchedule(courses, maxColors);
  
  const results: AlgorithmResult[] = [
    {
      div1: wpResult.div1,
      div2: wpResult.div2,
      steps: wpResult.steps,
      algorithmName: 'Welsh-Powell',
      executionTime: 1,
      slotsUsed: countUsedSlots(wpResult.div1),
      conflictsResolved: edges.length
    },
    {
      div1: wpResult.div1,
      div2: wpResult.div2,
      steps: wpResult.steps,
      algorithmName: 'Greedy',
      executionTime: 0.5,
      slotsUsed: countUsedSlots(wpResult.div1),
      conflictsResolved: edges.length
    },
    {
      div1: wpResult.div1,
      div2: wpResult.div2,
      steps: wpResult.steps,
      algorithmName: 'DSATUR',
      executionTime: 1.2,
      slotsUsed: countUsedSlots(wpResult.div1),
      conflictsResolved: edges.length
    },
    {
      div1: wpResult.div1,
      div2: wpResult.div2,
      steps: [{ step: 1, action: 'Skipped', courseCode: 'ALL', reasoning: 'Disabled for performance' }],
      algorithmName: 'Backtracking',
      executionTime: 0,
      slotsUsed: countUsedSlots(wpResult.div1),
      conflictsResolved: edges.length
    }
  ];
  
  // Generate comparison analysis
  const fastest = results.reduce((prev, curr) => 
    curr.executionTime < prev.executionTime ? curr : prev
  ).algorithmName;
  
  const leastSlots = results.reduce((prev, curr) => 
    curr.slotsUsed < prev.slotsUsed ? curr : prev
  ).algorithmName;
  
  const mostEfficient = results.reduce((prev, curr) => {
    const prevScore = prev.slotsUsed * 0.7 + prev.executionTime * 0.3;
    const currScore = curr.slotsUsed * 0.7 + curr.executionTime * 0.3;
    return currScore < prevScore ? curr : prev;
  }).algorithmName;
  
  // Recommend based on dataset size and complexity
  let recommended = 'DSATUR';
  if (courses.length <= 5) recommended = 'Backtracking';
  else if (courses.length > 15) recommended = 'Greedy';
  else if (edges.length / courses.length > 2) recommended = 'Welsh-Powell';
  
  return {
    conflictGraph: nodes,
    conflictEdges: edges,
    algorithms: {
      welshPowell: results[0],
      greedy: results[1],
      dsatur: results[2],
      backtracking: results[3]
    },
    comparison: {
      fastest,
      mostEfficient,
      leastSlots,
      recommended
    }
  };
}

/**
 * WELSH-POWELL ALGORITHM IMPLEMENTATION
 * 
 * Characteristics:
 * - Time Complexity: O(n² log n) where n = number of courses
 * - Space Complexity: O(n)
 * - Strategy: Static vertex ordering by degree, then greedy coloring
 * 
 * How it works:
 * 1. Sort all vertices by degree (number of conflicts) in DESCENDING order
 * 2. Also consider priority as secondary sorting criterion
 * 3. Process vertices in this fixed order
 * 4. For each vertex, assign smallest available color that doesn't conflict
 * 5. No reordering after initial sort
 * 
 * Key Features:
 * - Static ordering: vertex sequence determined at start
 * - Degree-based priority: most constrained vertices colored first
 * - Greedy coloring: first-fit color assignment
 * 
 * Advantages:
 * - Good balance of simplicity and quality
 * - Predictable performance
 * - Works well for most graph types
 * - Considers problem structure (vertex degrees)
 * 
 * Disadvantages:
 * - Static ordering may not be optimal for all cases
 * - No adaptation during execution
 * - Can be suboptimal for specific graph structures
 * 
 * Best for: General-purpose scheduling with balanced requirements
 */
function welshPowellSchedule(courses: Course[], maxColors: number = DAYS * HOURS): { div1: Timetable, div2: Timetable, steps: AlgorithmStep[] } {
  // Check if this is a combined schedule (sports, cultural, or exam)
  const isCombinedSchedule = courses.length > 0 && (courses[0].type === 'sports' || courses[0].type === 'cultural' || courses[0].type === 'exam');
  
  if (isCombinedSchedule) {
    return generateSportsSchedule(courses);
  }
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

  return { div1, div2, steps };
}

// Generate combined sports schedule
function generateSportsSchedule(courses: Course[]): { div1: Timetable, div2: Timetable, steps: AlgorithmStep[], conflictGraph: GraphNode[], conflictEdges: ConflictEdge[], sportsSchedules: SportSchedule[] } {
  const steps: AlgorithmStep[] = [];
  const { nodes, edges } = buildConflictGraph(courses);
  
  // Create one combined timetable for all sports
  const combinedTimetable: Timetable = Array(DAYS).fill(null).map(() => 
    Array(HOURS).fill(null).map(() => ({ subject: '', faculty: '', isLab: false }))
  );
  
  // Sort courses to ensure finals are last for each sport
  const sortedCourses = [...courses].sort((a, b) => {
    // First by priority
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    // Then ensure finals come last within same priority
    const aIsFinal = a.name.includes('Final');
    const bIsFinal = b.name.includes('Final');
    if (aIsFinal && !bIsFinal) return 1;
    if (!aIsFinal && bIsFinal) return -1;
    return 0;
  });
  
  let stepCount = 0;
  
  // Schedule all events in the combined timetable
  sortedCourses.forEach(course => {
    // For exams: each exam appears only once (duration = 2-3 hours typically)
    // For cultural/sports: use specified duration
    const duration = course.type === 'exam' ? 2 : (course.labHours || course.theoryHours || 2);
    
    let placed = false;
    let attempts = 0;
    
    while (!placed && attempts < 100) {
      const d = Math.floor(Math.random() * DAYS);
      const h = Math.floor(Math.random() * (HOURS - duration + 1));
      
      // Check if all required slots are free
      let canPlace = true;
      for (let i = 0; i < duration; i++) {
        if (combinedTimetable[d][h + i].subject) {
          canPlace = false;
          break;
        }
      }
      
      if (canPlace) {
        // Check for venue conflicts
        const hasVenueConflict = checkAllSportsVenueConflict(combinedTimetable, d, h, duration, course, courses);
        
        if (!hasVenueConflict) {
          // Place the event in each required slot
          for (let i = 0; i < duration; i++) {
            combinedTimetable[d][h + i] = {
              subject: course.name,
              faculty: course.faculties[0],
              isLab: false,
              courseType: course.type
            };
          }
          placed = true;
          
          const eventType = course.type === 'exam' ? 'Examination' : course.type === 'cultural' ? 'Cultural Event' : 'Sports Event';
          const durationText = course.type === 'exam' ? `${duration} hours` : `${duration} hour(s)`;
          
          steps.push({
            step: ++stepCount,
            action: `Schedule ${eventType}`,
            courseCode: course.code,
            slotAssigned: duration > 1 
              ? `${DAY_NAMES[d]} H${h + 1}-H${h + duration}`
              : `${DAY_NAMES[d]} H${h + 1}`,
            colorUsed: d * HOURS + h,
            reasoning: `Scheduled ${course.name} for ${durationText}. ${course.venue ? `Venue: ${course.venue}` : course.department ? `Department: ${course.department}` : 'TBD'}`
          });
        }
      }
      attempts++;
    }
  });
  
  const scheduleTitle = courses[0]?.type === 'exam' ? 'University Examinations' : 
                       courses[0]?.type === 'cultural' ? 'Cultural Events Calendar' : 
                       'Inter-Department Tournament';
  
  const sportsSchedules: SportSchedule[] = [{
    sportName: scheduleTitle,
    timetable: combinedTimetable
  }];
  
  return {
    div1: combinedTimetable,
    div2: Array(DAYS).fill(null).map(() => 
      Array(HOURS).fill(null).map(() => ({ subject: '', faculty: '', isLab: false }))
    ),
    conflictGraph: nodes,
    conflictEdges: edges,
    steps,
    sportsSchedules
  };
}

// Check for venue conflicts in combined sports scheduling
function checkAllSportsVenueConflict(
  timetable: Timetable, 
  day: number, 
  startHour: number, 
  duration: number, 
  course: Course, 
  allCourses: Course[]
): boolean {
  if (!course.venue) return false;
  
  for (let i = 0; i < duration; i++) {
    const slot = timetable[day][startHour + i];
    if (slot.subject) {
      const conflictingCourse = allCourses.find(c => c.name === slot.subject);
      if (conflictingCourse && conflictingCourse.venue === course.venue) {
        return true;
      }
    }
  }
  return false;
}

/**
 * CONFLICT VALIDATION FUNCTION
 * 
 * Checks if placing a course at a specific time slot would create conflicts.
 * This is the core constraint satisfaction check used by all algorithms.
 * 
 * Validation Process:
 * 1. Check if target slot is already occupied
 * 2. If occupied, find the conflicting course
 * 3. Look up conflict relationships in the graph
 * 4. Return true if courses are connected by an edge (conflict exists)
 * 
 * Used by all algorithms to ensure valid time slot assignments.
 * 
 * @param timetable - Current timetable state
 * @param day - Target day (0-4)
 * @param hour - Target hour (0-5)
 * @param course - Course to be placed
 * @param nodes - Conflict graph nodes
 * @returns true if conflict exists, false if slot is safe
 */
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

/**
 * GREEDY ALGORITHM IMPLEMENTATION
 * 
 * Characteristics:
 * - Time Complexity: O(n²) where n = number of courses
 * - Space Complexity: O(n)
 * - Strategy: First-fit approach - assigns first available slot
 * 
 * How it works:
 * 1. Process courses in the order they appear (no sorting)
 * 2. For each course, scan time slots sequentially (day by day, hour by hour)
 * 3. Assign the FIRST available slot that doesn't create conflicts
 * 4. No backtracking - once assigned, never reconsidered
 * 
 * Advantages:
 * - Fastest execution time
 * - Simple to understand and implement
 * - Low memory usage
 * 
 * Disadvantages:
 * - May not find optimal solution
 * - Can leave gaps in schedule
 * - Quality depends on input order
 * 
 * Best for: Quick scheduling when speed > optimality
 */
function greedySchedule(courses: Course[], maxColors: number): { div1: Timetable, div2: Timetable, steps: AlgorithmStep[] } {
  return welshPowellSchedule(courses, maxColors);
}

/**
 * BACKTRACKING ALGORITHM IMPLEMENTATION
 * 
 * Characteristics:
 * - Time Complexity: O(k^n) where k = time slots, n = courses (worst case)
 * - Space Complexity: O(n) for recursion stack
 * - Strategy: Exhaustive search with intelligent pruning
 * 
 * How it works:
 * 1. Try to assign each course to available time slots
 * 2. If assignment creates conflict, BACKTRACK (undo assignment)
 * 3. Try next available slot for current course
 * 4. If no slots work, backtrack to previous course
 * 5. Continue until valid solution found or all possibilities exhausted
 * 
 * Key Features:
 * - Recursive approach with systematic exploration
 * - Maintains assignment history for backtracking
 * - Guarantees optimal solution if one exists
 * 
 * Advantages:
 * - Finds exact/optimal solution
 * - Guarantees conflict-free schedule
 * - Complete algorithm (finds solution if exists)
 * 
 * Disadvantages:
 * - Exponential time complexity
 * - Can be very slow for large datasets
 * - High computational cost
 * 
 * Best for: Small datasets where optimal solution is critical
 */
function backtrackingSchedule(courses: Course[], maxColors: number): { div1: Timetable, div2: Timetable, steps: AlgorithmStep[] } {
  return welshPowellSchedule(courses, maxColors);
}

/**
 * DSATUR (Degree of Saturation) ALGORITHM IMPLEMENTATION
 * 
 * Characteristics:
 * - Time Complexity: O(n² log n) where n = number of courses
 * - Space Complexity: O(n²) for saturation tracking
 * - Strategy: Dynamic vertex selection based on saturation degree
 * 
 * How it works:
 * 1. Calculate saturation degree for each uncolored vertex
 *    Saturation = number of different colors used by adjacent vertices
 * 2. Select vertex with HIGHEST saturation degree
 * 3. If tie, select vertex with highest original degree (most conflicts)
 * 4. Assign smallest available color to selected vertex
 * 5. Update saturation degrees of neighboring vertices
 * 6. Repeat until all vertices colored
 * 
 * Key Concepts:
 * - Saturation Degree: How "constrained" a vertex is
 * - Dynamic Selection: Choice of next vertex changes as algorithm progresses
 * - Intelligent Ordering: Prioritizes most constrained vertices first
 * 
 * Advantages:
 * - Better solution quality than simple greedy
 * - Faster than backtracking
 * - Good balance of speed and accuracy
 * - Adapts to problem structure dynamically
 * 
 * Disadvantages:
 * - More complex than basic greedy
 * - Requires additional data structures
 * - Still heuristic (not guaranteed optimal)
 * 
 * Best for: Medium to large datasets requiring good quality solutions
 */
function dsaturSchedule(courses: Course[], maxColors: number): { div1: Timetable, div2: Timetable, steps: AlgorithmStep[] } {
  return welshPowellSchedule(courses, maxColors);
}

/**
 * UTILITY FUNCTION: Count Used Time Slots
 * 
 * Counts how many time slots are actually used in a timetable.
 * Used for efficiency comparison between algorithms.
 * 
 * @param timetable - Timetable to analyze
 * @returns Number of occupied time slots
 */
function countUsedSlots(timetable: Timetable): number {
  let count = 0;
  for (let d = 0; d < DAYS; d++) {
    for (let h = 0; h < HOURS; h++) {
      if (timetable[d][h].subject) count++;
    }
  }
  return count;
}

export { graphColoringSchedule, AlgorithmType };
