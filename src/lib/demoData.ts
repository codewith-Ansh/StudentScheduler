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
    type: 'academic'
  },
  {
    code: 'DS',
    name: 'Data Structures',
    priority: 2,
    theoryHours: 3,
    labHours: 2,
    labType: 1,
    faculties: ['Prof. Brown', 'Prof. Davis'],
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
    faculties: ['Prof. Smith'],
    type: 'exam'
  },
  {
    code: 'DS-E',
    name: 'Data Structures Exam',
    priority: 1,
    theoryHours: 2,
    labHours: 0,
    labType: 0,
    faculties: ['Prof. Brown'],
    type: 'exam'
  }
];

export const demoSports: Course[] = [
  {
    code: 'FB',
    name: 'Football Practice',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Coach Williams'],
    type: 'sports'
  },
  {
    code: 'BB',
    name: 'Basketball Practice',
    priority: 3,
    theoryHours: 0,
    labHours: 2,
    labType: 1,
    faculties: ['Coach Davis'],
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
          name: 'Music Event',
          priority: 3,
          theoryHours: 0,
          labHours: 2,
          labType: 1,
          faculties: ['Mr. Anderson'],
          type: 'cultural'
        }
      ];
    default:
      return demoCourses;
  }
}
