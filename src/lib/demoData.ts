import { Course } from './scheduler';

export const demoCourses: Course[] = [
  {
    code: 'DM',
    name: 'Discrete Mathematics',
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
    code: 'DS',
    name: 'Data Structures',
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
    code: 'DB',
    name: 'Database Systems',
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
    code: 'NW',
    name: 'Computer Networks',
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
    code: 'SE',
    name: 'Software Engineering',
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
    code: 'DM-E',
    name: 'Discrete Math Exam',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Prof. Smith', 'Prof. Wilson'],
    studentGroups: ['CS-A', 'CS-B'],
    department: 'Computer Science',
    venue: 'Main Hall',
    type: 'exam'
  },
  {
    code: 'DS-E',
    name: 'Data Structures Exam',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Prof. Brown', 'Prof. Anderson'],
    studentGroups: ['CS-A', 'IT-A'],
    department: 'Computer Science',
    venue: 'Main Hall',
    type: 'exam'
  },
  {
    code: 'DB-E',
    name: 'Database Exam',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Prof. Taylor', 'Prof. Wilson'],
    studentGroups: ['CS-B', 'IT-B'],
    department: 'Computer Science',
    venue: 'Hall 2',
    type: 'exam'
  }
];

export const demoSports: Course[] = [
  // Cricket Group A
  {
    code: 'CR-A1',
    name: 'Cricket Group A: CE vs CS',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'CS'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-A2',
    name: 'Cricket Group A: CS vs IT',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['CS', 'IT'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-A3',
    name: 'Cricket Group A: CE vs IT',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['CE', 'IT'],
    venue: 'Ground A',
    type: 'sports'
  },
  // Cricket Group B
  {
    code: 'CR-B1',
    name: 'Cricket Group B: ME vs EE',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['ME', 'EE'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-B2',
    name: 'Cricket Group B: EE vs EC',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['EE', 'EC'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-B3',
    name: 'Cricket Group B: ME vs EC',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['ME', 'EC'],
    venue: 'Ground A',
    type: 'sports'
  },
  // Cricket Knockout
  {
    code: 'CR-SF1',
    name: 'Cricket Semi-Final: A1 vs B2',
    priority: 2,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['A1', 'B2'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-SF2',
    name: 'Cricket Semi-Final: B1 vs A2',
    priority: 2,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['B1', 'A2'],
    venue: 'Ground A',
    type: 'sports'
  },
  {
    code: 'CR-F',
    name: 'Cricket Final',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Cricket Umpire'],
    teams: ['Winner SF1', 'Winner SF2'],
    venue: 'Ground A',
    type: 'sports'
  },
  // Football Group A
  {
    code: 'FB-A1',
    name: 'Football Group A: CE vs CS',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['CE', 'CS'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-A2',
    name: 'Football Group A: CS vs IT',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['CS', 'IT'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-A3',
    name: 'Football Group A: CE vs IT',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['CE', 'IT'],
    venue: 'Ground B',
    type: 'sports'
  },
  // Football Group B
  {
    code: 'FB-B1',
    name: 'Football Group B: ME vs EE',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['ME', 'EE'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-B2',
    name: 'Football Group B: EE vs EC',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['EE', 'EC'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-B3',
    name: 'Football Group B: ME vs EC',
    priority: 1,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['ME', 'EC'],
    venue: 'Ground B',
    type: 'sports'
  },
  // Football Knockout
  {
    code: 'FB-SF1',
    name: 'Football Semi-Final: A1 vs B2',
    priority: 2,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['A1', 'B2'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-SF2',
    name: 'Football Semi-Final: B1 vs A2',
    priority: 2,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['B1', 'A2'],
    venue: 'Ground B',
    type: 'sports'
  },
  {
    code: 'FB-F',
    name: 'Football Final',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Football Referee'],
    teams: ['Winner SF1', 'Winner SF2'],
    venue: 'Ground B',
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
          name: 'Music Prelims: CE vs CS vs IT',
          priority: 2,
          theoryHours: 0,
          labHours: 2,
          labType: 1,
          faculties: ['Mr. Anderson'],
          teams: ['CE Music', 'CS Music', 'IT Music'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'MUS-F',
          name: 'Music Final',
          priority: 3,
          theoryHours: 0,
          labHours: 2,
          labType: 1,
          faculties: ['Mr. Anderson'],
          teams: ['Finalists'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'DRM-1',
          name: 'Drama Competition: Group A',
          priority: 2,
          theoryHours: 0,
          labHours: 3,
          labType: 1,
          faculties: ['Ms. Roberts'],
          teams: ['CE Drama', 'CS Drama', 'IT Drama'],
          venue: 'Theater Hall',
          type: 'cultural'
        },
        {
          code: 'DAN-1',
          name: 'Dance Battle: ME vs EE vs EC',
          priority: 2,
          theoryHours: 0,
          labHours: 2,
          labType: 1,
          faculties: ['Ms. Johnson'],
          teams: ['ME Dance', 'EE Dance', 'EC Dance'],
          venue: 'Main Auditorium',
          type: 'cultural'
        }
      ];
    default:
      return demoCourses;
  }
}
