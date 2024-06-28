import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 27933,
  startDate: dayjs('2024-06-27T04:48'),
  endDate: dayjs('2024-06-27T04:58'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 838,
  startDate: dayjs('2024-06-26T16:17'),
  endDate: dayjs('2024-06-26T20:37'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 20530,
  startDate: dayjs('2024-06-26T13:23'),
  endDate: dayjs('2024-06-26T11:45'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T12:42'),
  endDate: dayjs('2024-06-26T17:08'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
