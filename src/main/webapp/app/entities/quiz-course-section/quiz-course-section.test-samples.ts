import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 29859,
  startDate: dayjs('2024-06-27T03:17'),
  endDate: dayjs('2024-06-27T04:12'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 11190,
  startDate: dayjs('2024-06-26T10:07'),
  endDate: dayjs('2024-06-26T15:08'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 25781,
  startDate: dayjs('2024-06-26T10:08'),
  endDate: dayjs('2024-06-27T01:26'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-27T03:33'),
  endDate: dayjs('2024-06-26T22:23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
