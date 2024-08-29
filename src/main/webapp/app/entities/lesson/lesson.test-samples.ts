import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 4849,
  lessonTitle: 'gnash',
  startPlanDate: dayjs('2024-06-26T11:49'),
  lessonType: 'Seminar',
};

export const sampleWithPartialData: ILesson = {
  id: 8592,
  lessonTitle: 'reluctantly',
  startPlanDate: dayjs('2024-06-27T01:24'),
  lessonType: 'Lab',
  videoUrl: 'weave',
};

export const sampleWithFullData: ILesson = {
  id: 24372,
  lessonTitle: 'bondsman',
  startPlanDate: dayjs('2024-06-26T19:30'),
  actualLessonDate: dayjs('2024-06-26T09:17'),
  lessonType: 'Practice',
  videoUrl: 'given forenenst generously',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'astride',
  startPlanDate: dayjs('2024-06-26T09:17'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
