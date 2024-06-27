import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 5305,
  lessonTitle: 'narrowcast',
  startPlanDate: dayjs('2024-06-27T05:34'),
  lessonType: 'Seminar',
};

export const sampleWithPartialData: ILesson = {
  id: 26143,
  lessonTitle: 'while',
  startPlanDate: dayjs('2024-06-27T06:19'),
  lessonType: 'Seminar',
};

export const sampleWithFullData: ILesson = {
  id: 20962,
  lessonTitle: 'uh-huh positively indeed',
  startPlanDate: dayjs('2024-06-26T20:05'),
  actualLessonDate: dayjs('2024-06-27T02:41'),
  lessonType: 'Lecture',
  videoUrl: 'modulo',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'violet',
  startPlanDate: dayjs('2024-06-27T03:40'),
  lessonType: 'Lab',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
