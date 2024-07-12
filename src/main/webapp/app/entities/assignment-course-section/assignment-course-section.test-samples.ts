import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 18261,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 15448,
  endDate: dayjs('2024-07-01T16:31'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 3370,
  startDate: dayjs('2024-07-01T18:36'),
  endDate: dayjs('2024-07-01T22:26'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
