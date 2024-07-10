import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 28935,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 1563,
  startDate: dayjs('2024-07-02T08:01'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 26684,
  startDate: dayjs('2024-07-01T18:02'),
  endDate: dayjs('2024-07-01T18:08'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
