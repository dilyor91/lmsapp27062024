import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 10174,
  startDate: dayjs('2024-06-26T19:19'),
  endDate: dayjs('2024-06-26T20:32'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 12392,
  startDate: dayjs('2024-06-26T15:10'),
  endDate: dayjs('2024-06-26T21:26'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 22311,
  startDate: dayjs('2024-06-26T16:25'),
  endDate: dayjs('2024-06-27T04:40'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-27T05:47'),
  endDate: dayjs('2024-06-26T20:58'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
