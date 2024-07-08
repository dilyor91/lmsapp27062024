import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 14409,
  lessonTitle: 'gah eek',
  startPlanDate: dayjs('2024-06-26T22:07'),
  lessonType: 'Lecture',
};

export const sampleWithPartialData: ILesson = {
  id: 16837,
  lessonTitle: 'outside',
  startPlanDate: dayjs('2024-06-27T00:34'),
  actualLessonDate: dayjs('2024-06-26T15:47'),
  lessonType: 'Practice',
};

export const sampleWithFullData: ILesson = {
  id: 25006,
  lessonTitle: 'consonant',
  startPlanDate: dayjs('2024-06-26T21:08'),
  actualLessonDate: dayjs('2024-06-26T18:46'),
  lessonType: 'Practice',
  videoUrl: 'painting',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'scarf gel',
  startPlanDate: dayjs('2024-06-26T22:50'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
