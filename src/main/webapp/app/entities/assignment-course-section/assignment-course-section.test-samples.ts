import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 14567,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 7430,
  startDate: dayjs('2024-07-02T01:21'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 24378,
  startDate: dayjs('2024-07-01T16:46'),
  endDate: dayjs('2024-07-01T22:01'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
