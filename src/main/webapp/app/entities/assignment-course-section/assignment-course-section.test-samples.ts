import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 19641,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 15769,
  endDate: dayjs('2024-07-01T20:09'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 8938,
  startDate: dayjs('2024-07-01T16:21'),
  endDate: dayjs('2024-07-01T11:28'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
