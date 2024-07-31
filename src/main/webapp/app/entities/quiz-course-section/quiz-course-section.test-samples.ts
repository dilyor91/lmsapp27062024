import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 1445,
  startDate: dayjs('2024-06-26T06:35'),
  endDate: dayjs('2024-06-26T09:02'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 6662,
  startDate: dayjs('2024-06-26T15:39'),
  endDate: dayjs('2024-06-26T08:52'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 25563,
  startDate: dayjs('2024-06-26T12:58'),
  endDate: dayjs('2024-06-27T03:33'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T12:15'),
  endDate: dayjs('2024-06-26T20:07'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
