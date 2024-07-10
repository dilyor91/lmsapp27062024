import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 24673,
  lessonTitle: 'advance dishonest',
  startPlanDate: dayjs('2024-06-26T14:39'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 10047,
  lessonTitle: 'dragon um',
  startPlanDate: dayjs('2024-06-26T07:17'),
  actualLessonDate: dayjs('2024-06-26T17:09'),
  lessonType: 'Lab',
  videoUrl: 'concerning',
};

export const sampleWithFullData: ILesson = {
  id: 29169,
  lessonTitle: 'while',
  startPlanDate: dayjs('2024-06-26T06:32'),
  actualLessonDate: dayjs('2024-06-26T15:24'),
  lessonType: 'Seminar',
  videoUrl: 'which who afternoon',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'incidentally woodwind',
  startPlanDate: dayjs('2024-06-26T09:07'),
  lessonType: 'Lecture',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
