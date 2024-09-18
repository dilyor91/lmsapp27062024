import dayjs from 'dayjs/esm';

import { IAssignmentCourseSection, NewAssignmentCourseSection } from './assignment-course-section.model';

export const sampleWithRequiredData: IAssignmentCourseSection = {
  id: 19203,
};

export const sampleWithPartialData: IAssignmentCourseSection = {
  id: 8823,
  startDate: dayjs('2024-07-02T02:17'),
  endDate: dayjs('2024-07-02T04:38'),
};

export const sampleWithFullData: IAssignmentCourseSection = {
  id: 4519,
  startDate: dayjs('2024-07-02T01:32'),
  endDate: dayjs('2024-07-01T18:22'),
};

export const sampleWithNewData: NewAssignmentCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
