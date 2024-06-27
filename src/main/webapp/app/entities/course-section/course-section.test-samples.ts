import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 8777,
  sectionName: 'sans',
};

export const sampleWithPartialData: ICourseSection = {
  id: 18469,
  sectionName: 'clapboard',
};

export const sampleWithFullData: ICourseSection = {
  id: 3606,
  sectionName: 'because',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'yet',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
