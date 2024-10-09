import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 28999,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 28980,
  startDate: dayjs('2024-07-01T12:17'),
  endDate: dayjs('2024-07-02T04:05'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 9577,
  startDate: dayjs('2024-07-02T02:55'),
  endDate: dayjs('2024-07-02T03:59'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
