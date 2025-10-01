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
  {
    code: 'FB',
    name: 'Football Match',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Coach Williams'],
    studentGroups: ['CS-A', 'IT-B'],
    teams: ['CS Team', 'IT Team'],
    venue: 'Football Ground',
    type: 'sports'
  },
  {
    code: 'BB',
    name: 'Basketball Tournament',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Coach Davis'],
    studentGroups: ['CS-B', 'EC-A'],
    teams: ['Team Alpha', 'Team Beta'],
    venue: 'Basketball Court',
    type: 'sports'
  },
  {
    code: 'CR',
    name: 'Cricket Match',
    priority: 3,
    theoryHours: 0,
    labHours: 3,
    labType: 1,
    faculties: ['Coach Smith'],
    studentGroups: ['IT-A', 'EC-B'],
    teams: ['Warriors', 'Champions'],
    venue: 'Cricket Ground',
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
          code: 'MUS',
          name: 'Music Competition',
          priority: 3,
          theoryHours: 0,
          labHours: 2,
          labType: 1,
          faculties: ['Mr. Anderson'],
          studentGroups: ['CS-A', 'IT-A'],
          teams: ['Music Club', 'Harmony Group'],
          venue: 'Main Auditorium',
          type: 'cultural'
        },
        {
          code: 'DRM',
          name: 'Drama Performance',
          priority: 3,
          theoryHours: 0,
          labHours: 3,
          labType: 1,
          faculties: ['Ms. Roberts'],
          studentGroups: ['CS-B', 'EC-A'],
          teams: ['Drama Club'],
          venue: 'Main Auditorium',
          type: 'cultural'
        }
      ];
    default:
      return demoCourses;
  }
}
