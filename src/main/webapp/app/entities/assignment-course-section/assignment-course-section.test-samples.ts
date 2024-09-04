import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 20477,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 4359,
  startDate: dayjs('2024-07-01T17:07'),
  endDate: dayjs('2024-07-01T20:08'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 17468,
  startDate: dayjs('2024-07-01T15:31'),
  endDate: dayjs('2024-07-02T04:39'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
