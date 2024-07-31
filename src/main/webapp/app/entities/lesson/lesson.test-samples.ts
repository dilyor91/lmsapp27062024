import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 738,
  lessonTitle: 'larch',
  startPlanDate: dayjs('2024-06-26T10:25'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 2282,
  lessonTitle: 'by why rightfully',
  startPlanDate: dayjs('2024-06-26T23:52'),
  lessonType: 'Lecture',
};

export const sampleWithFullData: ILesson = {
  id: 24535,
  lessonTitle: 'glasses against underneath',
  startPlanDate: dayjs('2024-06-26T07:05'),
  actualLessonDate: dayjs('2024-06-27T01:09'),
  lessonType: 'Seminar',
  videoUrl: 'mantle',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'significance evening',
  startPlanDate: dayjs('2024-06-26T19:09'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
