import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 1708,
  lessonTitle: 'tremendously provided which',
  startPlanDate: dayjs('2024-06-27T01:51'),
  lessonType: 'Lecture',
};

export const sampleWithPartialData: ILesson = {
  id: 22603,
  lessonTitle: 'tighten',
  startPlanDate: dayjs('2024-06-26T06:41'),
  actualLessonDate: dayjs('2024-06-26T10:36'),
  lessonType: 'Lecture',
};

export const sampleWithFullData: ILesson = {
  id: 28904,
  lessonTitle: 'scoff',
  startPlanDate: dayjs('2024-06-26T22:34'),
  actualLessonDate: dayjs('2024-06-26T09:38'),
  lessonType: 'Lab',
  videoUrl: 'intelligent',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'round as triumphantly',
  startPlanDate: dayjs('2024-06-26T07:40'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
