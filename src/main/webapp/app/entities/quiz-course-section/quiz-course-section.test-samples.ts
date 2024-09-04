import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 24299,
  startDate: dayjs('2024-06-26T11:33'),
  endDate: dayjs('2024-06-26T16:01'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 11734,
  startDate: dayjs('2024-06-27T00:53'),
  endDate: dayjs('2024-06-26T18:36'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 29842,
  startDate: dayjs('2024-06-26T22:45'),
  endDate: dayjs('2024-06-26T14:57'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T20:15'),
  endDate: dayjs('2024-06-26T20:23'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
