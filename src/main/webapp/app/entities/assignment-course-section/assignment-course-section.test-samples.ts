import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 28907,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 27674,
  startDate: dayjs('2024-07-02T01:17'),
  endDate: dayjs('2024-07-01T17:59'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 27491,
  startDate: dayjs('2024-07-02T09:02'),
  endDate: dayjs('2024-07-01T16:35'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
