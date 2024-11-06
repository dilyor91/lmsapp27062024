import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 18612,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 1016,
  startDate: dayjs('2024-07-02T00:22'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 14603,
  startDate: dayjs('2024-07-01T18:11'),
  endDate: dayjs('2024-07-02T06:48'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
