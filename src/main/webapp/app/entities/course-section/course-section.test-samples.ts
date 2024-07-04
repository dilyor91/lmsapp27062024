import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 14036,
  sectionName: 'except',
};

export const sampleWithPartialData: ICourseSection = {
  id: 11056,
  sectionName: 'timely',
};

export const sampleWithFullData: ICourseSection = {
  id: 27792,
  sectionName: 'entry until absentmindedly',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'whose',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
