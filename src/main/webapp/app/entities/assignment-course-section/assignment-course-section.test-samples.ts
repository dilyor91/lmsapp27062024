import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 29301,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 31942,
  startDate: dayjs('2024-07-01T12:54'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 1563,
  startDate: dayjs('2024-07-02T03:53'),
  endDate: dayjs('2024-07-02T00:51'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
