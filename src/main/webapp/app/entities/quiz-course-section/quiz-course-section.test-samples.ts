import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 3292,
  startDate: dayjs('2024-06-26T08:49'),
  endDate: dayjs('2024-06-26T18:25'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 18446,
  startDate: dayjs('2024-06-26T20:18'),
  endDate: dayjs('2024-06-26T08:31'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 5840,
  startDate: dayjs('2024-06-26T14:42'),
  endDate: dayjs('2024-06-27T04:40'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T13:05'),
  endDate: dayjs('2024-06-26T23:24'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
