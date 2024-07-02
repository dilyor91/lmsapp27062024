import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 11023,
  lessonTitle: 'prophesy',
  startPlanDate: dayjs('2024-06-26T10:22'),
  lessonType: 'Lab',
};

export const sampleWithPartialData: ILesson = {
  id: 12823,
  lessonTitle: 'barrack gherkin lined',
  startPlanDate: dayjs('2024-06-26T09:14'),
  lessonType: 'Practice',
  videoUrl: 'brr apud or',
};

export const sampleWithFullData: ILesson = {
  id: 1543,
  lessonTitle: 'snarl colorfully',
  startPlanDate: dayjs('2024-06-26T14:34'),
  actualLessonDate: dayjs('2024-06-26T08:48'),
  lessonType: 'Lab',
  videoUrl: 'productive pressurize',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'noisily whirlpool',
  startPlanDate: dayjs('2024-06-26T08:53'),
  lessonType: 'Seminar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
