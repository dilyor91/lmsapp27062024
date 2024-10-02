import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 26119,
  sectionName: 'thread hm',
};

export const sampleWithPartialData: ICourseSection = {
  id: 22603,
  sectionName: 'usable thoughtfully',
};

export const sampleWithFullData: ICourseSection = {
  id: 6097,
  sectionName: 'aside',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'tasty submitter stage',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
