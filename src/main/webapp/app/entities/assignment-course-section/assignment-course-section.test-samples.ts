import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 31071,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 8317,
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 11740,
  startDate: dayjs('2024-07-02T09:22'),
  endDate: dayjs('2024-07-01T16:25'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
