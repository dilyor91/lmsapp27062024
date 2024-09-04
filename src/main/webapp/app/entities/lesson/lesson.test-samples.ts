import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 20516,
  lessonTitle: 'inability',
  startPlanDate: dayjs('2024-06-27T04:34'),
  lessonType: 'Seminar',
};

export const sampleWithPartialData: ILesson = {
  id: 17401,
  lessonTitle: 'anenst',
  startPlanDate: dayjs('2024-06-26T12:08'),
  lessonType: 'Lab',
};

export const sampleWithFullData: ILesson = {
  id: 23693,
  lessonTitle: 'inauguration fortunately across',
  startPlanDate: dayjs('2024-06-26T11:09'),
  actualLessonDate: dayjs('2024-06-26T08:51'),
  lessonType: 'Seminar',
  videoUrl: 'put',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'grain in-joke',
  startPlanDate: dayjs('2024-06-26T11:24'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
