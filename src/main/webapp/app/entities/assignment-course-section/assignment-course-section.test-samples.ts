import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 4487,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 31989,
  startDate: dayjs('2024-07-01T17:09'),
  endDate: dayjs('2024-07-02T04:16'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 9999,
  startDate: dayjs('2024-07-01T12:04'),
  endDate: dayjs('2024-07-01T17:49'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
