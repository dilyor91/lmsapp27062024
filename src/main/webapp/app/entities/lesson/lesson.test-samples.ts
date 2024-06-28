import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 8149,
  lessonTitle: 'meanwhile misreading angry',
  startPlanDate: dayjs('2024-06-26T23:31'),
  lessonType: 'Lecture',
};

export const sampleWithPartialData: ILesson = {
  id: 26482,
  lessonTitle: 'disgusting when',
  startPlanDate: dayjs('2024-06-26T08:35'),
  actualLessonDate: dayjs('2024-06-26T20:05'),
  lessonType: 'Lecture',
  videoUrl: 'anenst hence provided',
};

export const sampleWithFullData: ILesson = {
  id: 27067,
  lessonTitle: 'almost',
  startPlanDate: dayjs('2024-06-26T23:30'),
  actualLessonDate: dayjs('2024-06-27T02:40'),
  lessonType: 'Seminar',
  videoUrl: 'minus vivid hence',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'digit',
  startPlanDate: dayjs('2024-06-27T01:10'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
