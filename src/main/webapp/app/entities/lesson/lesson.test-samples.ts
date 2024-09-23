import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 8259,
  lessonTitle: 'however publicize',
  startPlanDate: dayjs('2024-06-26T07:57'),
  lessonType: 'Seminar',
};

export const sampleWithPartialData: ILesson = {
  id: 28500,
  lessonTitle: 'late likewise',
  startPlanDate: dayjs('2024-06-27T03:08'),
  lessonType: 'Lab',
  videoUrl: 'yum',
};

export const sampleWithFullData: ILesson = {
  id: 30676,
  lessonTitle: 'fast or aw',
  startPlanDate: dayjs('2024-06-27T01:35'),
  actualLessonDate: dayjs('2024-06-26T21:57'),
  lessonType: 'Practice',
  videoUrl: 'within gah',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'until louse',
  startPlanDate: dayjs('2024-06-26T08:13'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
