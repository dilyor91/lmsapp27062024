import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 23806,
  sectionName: 'hard-to-find',
};

export const sampleWithPartialData: ICourseSection = {
  id: 8341,
  sectionName: 'every apud',
};

export const sampleWithFullData: ICourseSection = {
  id: 6228,
  sectionName: 'dearest',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'between magic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
