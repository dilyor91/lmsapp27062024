import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 13571,
  lessonTitle: 'surprised prosperity',
  startPlanDate: dayjs('2024-06-27T01:55'),
  lessonType: 'Lecture',
};

export const sampleWithPartialData: ILesson = {
  id: 20213,
  lessonTitle: 'regionalism mmm cultured',
  startPlanDate: dayjs('2024-06-27T04:22'),
  actualLessonDate: dayjs('2024-06-26T20:49'),
  lessonType: 'Practice',
};

export const sampleWithFullData: ILesson = {
  id: 18879,
  lessonTitle: 'triumphantly',
  startPlanDate: dayjs('2024-06-27T03:53'),
  actualLessonDate: dayjs('2024-06-26T07:53'),
  lessonType: 'Seminar',
  videoUrl: 'foolishly thoughtfully victoriously',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'indeed truthfully beef',
  startPlanDate: dayjs('2024-06-27T05:34'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
