import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 2016,
  lessonTitle: 'separately skive',
  startPlanDate: dayjs('2024-06-26T23:36'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 32473,
  lessonTitle: 'fatally supposing tame',
  startPlanDate: dayjs('2024-06-27T05:40'),
  actualLessonDate: dayjs('2024-06-27T02:59'),
  lessonType: 'Lecture',
};

export const sampleWithFullData: ILesson = {
  id: 28903,
  lessonTitle: 'outline who',
  startPlanDate: dayjs('2024-06-26T18:03'),
  actualLessonDate: dayjs('2024-06-26T22:12'),
  lessonType: 'Practice',
  videoUrl: 'a through',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'jovially recklessly',
  startPlanDate: dayjs('2024-06-27T04:21'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
