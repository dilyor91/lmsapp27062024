import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 28153,
  startDate: dayjs('2024-06-26T13:23'),
  endDate: dayjs('2024-06-26T10:49'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 7429,
  startDate: dayjs('2024-06-26T19:08'),
  endDate: dayjs('2024-06-26T19:04'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 20888,
  startDate: dayjs('2024-06-26T15:38'),
  endDate: dayjs('2024-06-26T22:46'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T16:00'),
  endDate: dayjs('2024-06-26T13:42'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
