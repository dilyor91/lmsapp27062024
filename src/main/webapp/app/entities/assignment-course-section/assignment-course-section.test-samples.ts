import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 5023,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 21149,
  endDate: dayjs('2024-07-01T12:51'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 25506,
  startDate: dayjs('2024-07-01T21:57'),
  endDate: dayjs('2024-07-01T16:39'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
