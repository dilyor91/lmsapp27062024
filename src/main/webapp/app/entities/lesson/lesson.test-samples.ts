import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 32053,
  lessonTitle: 'pfft innocently schematise',
  startPlanDate: dayjs('2024-06-26T09:41'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 22321,
  lessonTitle: 'shyly bakeware until',
  startPlanDate: dayjs('2024-06-27T05:25'),
  actualLessonDate: dayjs('2024-06-26T09:39'),
  lessonType: 'Lab',
  videoUrl: 'newsprint',
};

export const sampleWithFullData: ILesson = {
  id: 13869,
  lessonTitle: 'polarisation disk amongst',
  startPlanDate: dayjs('2024-06-26T14:05'),
  actualLessonDate: dayjs('2024-06-26T12:17'),
  lessonType: 'Lecture',
  videoUrl: 'coordinated pish',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'quarrelsomely how',
  startPlanDate: dayjs('2024-06-27T00:16'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
