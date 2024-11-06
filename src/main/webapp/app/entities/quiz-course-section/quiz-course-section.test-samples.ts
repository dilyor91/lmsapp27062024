import dayjs from 'dayjs/esm';

import { IQuizCourseSection, NewQuizCourseSection } from './quiz-course-section.model';

export const sampleWithRequiredData: IQuizCourseSection = {
  id: 750,
  startDate: dayjs('2024-06-26T15:43'),
  endDate: dayjs('2024-06-26T14:43'),
};

export const sampleWithPartialData: IQuizCourseSection = {
  id: 5380,
  startDate: dayjs('2024-06-26T15:59'),
  endDate: dayjs('2024-06-26T16:35'),
};

export const sampleWithFullData: IQuizCourseSection = {
  id: 28907,
  startDate: dayjs('2024-06-27T02:12'),
  endDate: dayjs('2024-06-26T22:37'),
};

export const sampleWithNewData: NewQuizCourseSection = {
  startDate: dayjs('2024-06-26T16:30'),
  endDate: dayjs('2024-06-27T04:45'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
