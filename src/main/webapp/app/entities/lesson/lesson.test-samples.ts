import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 21212,
  lessonTitle: 'upwardly apropos fooey',
  startPlanDate: dayjs('2024-06-26T07:53'),
  lessonType: 'Practice',
};

export const sampleWithPartialData: ILesson = {
  id: 21125,
  lessonTitle: 'on',
  startPlanDate: dayjs('2024-06-27T04:16'),
  actualLessonDate: dayjs('2024-06-26T08:40'),
  lessonType: 'Lab',
  videoUrl: 'widow',
};

export const sampleWithFullData: ILesson = {
  id: 22331,
  lessonTitle: 'qua',
  startPlanDate: dayjs('2024-06-26T07:28'),
  actualLessonDate: dayjs('2024-06-27T04:16'),
  lessonType: 'Practice',
  videoUrl: 'helpfully what',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'digital',
  startPlanDate: dayjs('2024-06-26T20:03'),
  lessonType: 'Lecture',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
