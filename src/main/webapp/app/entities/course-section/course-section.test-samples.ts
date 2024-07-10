import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 19397,
  sectionName: 'meaningfully dearly minimalism',
};

export const sampleWithPartialData: ICourseSection = {
  id: 15795,
  sectionName: 'easily bah',
};

export const sampleWithFullData: ICourseSection = {
  id: 7266,
  sectionName: 'broken bashfully spike',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'pfft',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
