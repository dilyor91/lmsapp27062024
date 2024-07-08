import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 23001,
  sectionName: 'fooey reduction',
};

export const sampleWithPartialData: ICourseSection = {
  id: 25793,
  sectionName: 'meager finally placode',
};

export const sampleWithFullData: ICourseSection = {
  id: 4044,
  sectionName: 'afraid kindly',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'noisy pointed plus',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
