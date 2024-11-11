import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 14091,
  lessonTitle: 'total cafe artistic',
  startPlanDate: dayjs('2024-06-26T10:24'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 16459,
  lessonTitle: 'for assail',
  startPlanDate: dayjs('2024-06-26T18:39'),
  lessonType: 'Practice',
  videoUrl: 'tremendously',
};

export const sampleWithFullData: ILesson = {
  id: 17813,
  lessonTitle: 'vein',
  startPlanDate: dayjs('2024-06-26T11:03'),
  actualLessonDate: dayjs('2024-06-26T19:37'),
  lessonType: 'Lab',
  videoUrl: 'but',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'gosh dishonor',
  startPlanDate: dayjs('2024-06-26T20:43'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
