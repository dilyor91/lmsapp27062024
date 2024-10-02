import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 7897,
  lessonTitle: 'executor ameliorate',
  startPlanDate: dayjs('2024-06-26T12:40'),
  lessonType: 'Lecture',
};

export const sampleWithPartialData: ILesson = {
  id: 1332,
  lessonTitle: 'annex generously',
  startPlanDate: dayjs('2024-06-26T13:10'),
  lessonType: 'Lab',
};

export const sampleWithFullData: ILesson = {
  id: 25792,
  lessonTitle: 'idealistic mechanic so',
  startPlanDate: dayjs('2024-06-26T13:28'),
  actualLessonDate: dayjs('2024-06-26T23:28'),
  lessonType: 'Lab',
  videoUrl: 'ew',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'including',
  startPlanDate: dayjs('2024-06-26T11:09'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
