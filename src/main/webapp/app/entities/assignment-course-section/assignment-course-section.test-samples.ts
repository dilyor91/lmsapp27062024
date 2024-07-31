import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 8190,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 2110,
  startDate: dayjs('2024-07-01T23:52'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 3817,
  startDate: dayjs('2024-07-02T02:00'),
  endDate: dayjs('2024-07-01T12:18'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
