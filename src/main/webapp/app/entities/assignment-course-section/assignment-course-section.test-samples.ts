import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 7052,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 10209,
  startDate: dayjs('2024-07-02T01:39'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 9833,
  startDate: dayjs('2024-07-01T13:11'),
  endDate: dayjs('2024-07-01T22:12'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
