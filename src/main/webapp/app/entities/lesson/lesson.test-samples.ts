import dayjs from 'dayjs/esm';

import { ILesson, NewLesson } from './lesson.model';

export const sampleWithRequiredData: ILesson = {
  id: 31648,
  lessonTitle: 'gherkin mmm',
  startPlanDate: dayjs('2024-06-26T07:25'),
  lessonType: 'Lab',
};

export const sampleWithPartialData: ILesson = {
  id: 31880,
  lessonTitle: 'what',
  startPlanDate: dayjs('2024-06-26T12:59'),
  actualLessonDate: dayjs('2024-06-26T07:44'),
  lessonType: 'Lab',
};

export const sampleWithFullData: ILesson = {
  id: 26531,
  lessonTitle: 'normal stream besides',
  startPlanDate: dayjs('2024-06-26T15:41'),
  actualLessonDate: dayjs('2024-06-26T08:44'),
  lessonType: 'Practice',
  videoUrl: 'demand',
};

export const sampleWithNewData: NewLesson = {
  lessonTitle: 'amongst neglect',
  startPlanDate: dayjs('2024-06-26T23:18'),
  lessonType: 'Practice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
