import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 2850,
  startDate: dayjs('2024-06-26T07:26'),
  endDate: dayjs('2024-06-26T21:15'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 6106,
  startDate: dayjs('2024-06-26T07:43'),
  endDate: dayjs('2024-06-26T07:58'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 24526,
  startDate: dayjs('2024-06-26T21:21'),
  endDate: dayjs('2024-06-26T11:37'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T08:01'),
  endDate: dayjs('2024-06-26T15:10'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
