import { Course } from './scheduler';

export const demoCourses: Course[] = [
  {
    code: 'FCN101',
    name: 'FCN',
    priority: 1,
    theoryHours: 4,
    labHours: 2,
    labType: 1,
    faculties: ['Ritesh sir', 'Parm sir', 'Muskan mam'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  },
  {
    code: 'DM',
    name: 'Discrete Mathematics',
    priority: 2,
    theoryHours: 4,
    labHours: 0,
    labType: 0,
    faculties: ['Nirumam'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  },
  {
    code: 'DSA102',
    name: 'FDSA',
    priority: 1,
    theoryHours: 4,
    labHours: 2,
    labType: 1,
    faculties: ['Nikita Mam', 'Sarita mam'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  },
  {
    code: 'HSUV',
    name: 'Creativity',
    priority: 3,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Punit patel', 'Subhramanian'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  },
  {
    code: 'WDF205',
    name: 'WDF',
    priority: 1,
    theoryHours: 4,
    labHours: 4,
    labType: 1,
    faculties: ['Martin sir', 'Deep sir'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  },
  {
    code: 'OOP',
    name: 'Java',
    priority: 2,
    theoryHours: 2,
    labHours: 2,
    labType: 1,
    faculties: ['Mrugrendra sir', 'Ronak sir'],
    studentGroups: ['CE1', 'CE2'],
    venue: '623, 622',
    type: 'academic'
  }
];

// Updated with actual faculty names for CE1/CE2 courses
// Legacy demo courses for reference
export const legacyDemoCourses: Course[] = [
  {
    code: 'DM-OLD',
    name: 'Discrete Mathematics (Legacy)',
    priority: 1,
    theoryHours: 4,
    labHours: 2,
    labType: 1,
    faculties: ['Prof. Smith', 'Prof. Johnson'],
    studentGroups: ['CS-A', 'CS-B'],
    venue: 'Room 101',
    type: 'academic'
  },
  {
    code: 'DS-OLD',
    name: 'Data Structures (Legacy)',
    priority: 2,
    theoryHours: 3,
    labHours: 2,
    labType: 1,
    faculties: ['Prof. Brown', 'Prof. Smith'],
    studentGroups: ['CS-A', 'IT-A'],
    venue: 'Lab 201',
    type: 'academic'
  },
  {
    code: 'DB-OLD',
    name: 'Database Systems (Legacy)',
    priority: 3,
    theoryHours: 3,
    labHours: 4,
    labType: 2,
    faculties: ['Prof. Wilson', 'Prof. Taylor'],
    studentGroups: ['CS-B', 'IT-B'],
    venue: 'Lab 202',
    type: 'academic'
  },
  {
    code: 'NW-OLD',
    name: 'Computer Networks (Legacy)',
    priority: 1,
    theoryHours: 2,
    labHours: 2,
    labType: 1,
    faculties: ['Prof. Anderson', 'Prof. Thomas'],
    studentGroups: ['IT-A', 'IT-B'],
    venue: 'Lab 301',
    type: 'academic'
  },
  {
    code: 'SE-OLD',
    name: 'Software Engineering (Legacy)',
    priority: 2,
    theoryHours: 4,
    labHours: 0,
    labType: 0,
    faculties: ['Prof. Martin'],
    studentGroups: ['CS-A', 'CS-B', 'IT-A'],
    venue: 'Room 102',
    type: 'academic'
  }
];

export const demoExams: Course[] = [
  {
    code: 'CN-1',
    name: 'Computer Network (CE)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CE'],
    venue: 'Lab 1',
    type: 'exam'
  },
  {
    code: 'CN-2',
    name: 'Computer Network (IT)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['IT'],
    venue: 'Lab 1',
    type: 'exam'
  },
  {
    code: 'CN-3',
    name: 'Computer Network (CS)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CS'],
    venue: 'Lab 1',
    type: 'exam'
  },
  {
    code: 'DS-1',
    name: 'Data Structure (CE)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CE'],
    venue: 'Lab 2',
    type: 'exam'
  },
  {
    code: 'DS-2',
    name: 'Data Structure (IT)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['IT'],
    venue: 'Lab 2',
    type: 'exam'
  },
  {
    code: 'DS-3',
    name: 'Data Structure (CS)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CS'],
    venue: 'Lab 2',
    type: 'exam'
  },
  {
    code: 'WD-1',
    name: 'Web Development (CE)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CE'],
    venue: 'Lab 3',
    type: 'exam'
  },
  {
    code: 'WD-2',
    name: 'Web Development (IT)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['IT'],
    venue: 'Lab 3',
    type: 'exam'
  },
  {
    code: 'WD-3',
    name: 'Web Development (CS)',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Examiner'],
    teams: ['CS'],
    venue: 'Lab 3',
    type: 'exam'
  }
];

export const demoSports: Course[] = [
  // Monday
  {
    code: 'CR-1',
    name: 'Cricket: CE vs CS',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'CS'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'FB-1',
    name: 'Football: CE vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['CE', 'IT'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'VB-1',
    name: 'Volleyball: CE vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Volleyball Referee'],
    teams: ['CE', 'ME'],
    venue: 'Court 1',
    type: 'sports'
  },
  {
    code: 'CR-2',
    name: 'Cricket: IT vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['IT', 'ME'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'FB-2',
    name: 'Football: CS vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['CS', 'ME'],
    venue: 'Ground B',
    type: 'sports'
  },
  // Tuesday
  {
    code: 'CR-3',
    name: 'Cricket: CE vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'IT'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'VB-2',
    name: 'Volleyball: CS vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Volleyball Referee'],
    teams: ['CS', 'IT'],
    venue: 'Court 1',
    type: 'sports'
  },
  {
    code: 'FB-3',
    name: 'Football: CE vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['CE', 'ME'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'CR-4',
    name: 'Cricket: CE vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'ME'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'FB-4',
    name: 'Football: CS vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['CS', 'IT'],
    venue: 'Ground B',
    type: 'sports'
  },
  // Wednesday
  {
    code: 'CR-5',
    name: 'Cricket: CS vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CS', 'IT'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'VB-3',
    name: 'Volleyball: IT vs CS',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Volleyball Referee'],
    teams: ['IT', 'CS'],
    venue: 'Court 1',
    type: 'sports'
  },
  {
    code: 'FB-5',
    name: 'Football: IT vs CS',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['IT', 'CS'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'VB-4',
    name: 'Volleyball: CE vs IT',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Volleyball Referee'],
    teams: ['CE', 'IT'],
    venue: 'Court 1',
    type: 'sports'
  },
  {
    code: 'CR-6',
    name: 'Cricket: CS vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CS', 'ME'],
    venue: 'Ground A',
    type: 'sports'
  },
  // Thursday
  {
    code: 'CR-7',
    name: 'Cricket: CE vs ME',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'ME'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'FB-6',
    name: 'Football: CE vs CS',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Football Referee'],
    teams: ['CE', 'CS'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'VB-5',
    name: 'Volleyball: CE vs CS',
    priority: 1,
    theoryHours: 1,
    labHours: 0,
    labType: 0,
    faculties: ['Volleyball Referee'],
    teams: ['CE', 'CS'],
    venue: 'Court 1',
    type: 'sports'
  }
];

export function getScheduleTypeData(type: string): Course[] {
  switch (type) {
    case 'academic':
      return demoCourses;
    case 'exam':
      return demoExams;
    case 'sports':
      return demoSports;
    case 'cultural':
      return [
        {
          code: 'MUS-1',
          name: 'Music: CE vs CS',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['CE', 'CS'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-2',
          name: 'Music: IT vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['IT', 'ME'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-3',
          name: 'Music: CE vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['CE', 'IT'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-4',
          name: 'Music: CS vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['CS', 'ME'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-5',
          name: 'Music: CE vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['CE', 'ME'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-6',
          name: 'Music: CS vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Music Judge'],
          teams: ['CS', 'IT'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'DAN-1',
          name: 'Dance: CE vs CS',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['CE', 'CS'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-2',
          name: 'Dance: IT vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['IT', 'ME'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-3',
          name: 'Dance: CE vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['CE', 'IT'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-4',
          name: 'Dance: CS vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['CS', 'ME'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-5',
          name: 'Dance: CE vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['CE', 'ME'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-6',
          name: 'Dance: CS vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Dance Judge'],
          teams: ['CS', 'IT'],
          venue: 'Dance Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-1',
          name: 'Drama: CE vs CS',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['CE', 'CS'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-2',
          name: 'Drama: IT vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['IT', 'ME'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-3',
          name: 'Drama: CE vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['CE', 'IT'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-4',
          name: 'Drama: CS vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['CS', 'ME'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-5',
          name: 'Drama: CE vs ME',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['CE', 'ME'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DRM-6',
          name: 'Drama: CS vs IT',
          priority: 1,
          theoryHours: 1,
          labHours: 0,
          labType: 0,
          faculties: ['Drama Judge'],
          teams: ['CS', 'IT'],
          venue: 'Theater Hall',
          type: 'cultural'
        }
      ];
    default:
      return demoCourses;
  }
}