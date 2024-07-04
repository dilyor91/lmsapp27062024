import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 16887,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 1144,
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 21413,
  startDate: dayjs('2024-07-02T05:32'),
  endDate: dayjs('2024-07-02T06:31'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
