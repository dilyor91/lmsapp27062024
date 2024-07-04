import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 5716,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 28393,
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 28544,
  startDate: dayjs('2024-07-01T15:42'),
  endDate: dayjs('2024-07-02T09:47'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
