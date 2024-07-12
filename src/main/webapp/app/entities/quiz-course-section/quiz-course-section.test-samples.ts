import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 31607,
  startDate: dayjs('2024-06-26T20:00'),
  endDate: dayjs('2024-06-26T18:49'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 20562,
  startDate: dayjs('2024-06-27T05:21'),
  endDate: dayjs('2024-06-26T21:48'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 22099,
  startDate: dayjs('2024-06-26T07:50'),
  endDate: dayjs('2024-06-26T13:52'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-27T02:32'),
  endDate: dayjs('2024-06-26T12:23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
