import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 1701,
  startDate: dayjs('2024-06-27T01:22'),
  endDate: dayjs('2024-06-27T00:50'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 24483,
  startDate: dayjs('2024-06-27T05:37'),
  endDate: dayjs('2024-06-27T04:08'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 28048,
  startDate: dayjs('2024-06-27T03:13'),
  endDate: dayjs('2024-06-26T20:28'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T21:20'),
  endDate: dayjs('2024-06-26T09:05'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
