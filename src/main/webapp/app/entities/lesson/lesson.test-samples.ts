import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 6206,
  lessonTitle: 'threadbare woot out',
  startPlanDate: dayjs('2024-06-26T17:24'),
  lessonType: 'Seminar',
};

export const sampleWithPartialData: ILesson = {
  id: 26739,
  lessonTitle: 'kooky',
  startPlanDate: dayjs('2024-06-26T06:36'),
  actualLessonDate: dayjs('2024-06-26T17:33'),
  lessonType: 'Practice',
  videoUrl: 'continually',
};

export const sampleWithFullData: ILesson = {
  id: 31948,
  lessonTitle: 'phooey striking terribly',
  startPlanDate: dayjs('2024-06-26T10:57'),
  actualLessonDate: dayjs('2024-06-26T22:36'),
  lessonType: 'Lecture',
  videoUrl: 'reword',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'failing valuable',
  startPlanDate: dayjs('2024-06-26T20:51'),
  lessonType: 'Lab',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
