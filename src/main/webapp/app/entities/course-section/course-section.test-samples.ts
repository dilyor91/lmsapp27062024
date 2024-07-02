import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 30158,
  sectionName: 'needily',
};

export const sampleWithPartialData: ICourseSection = {
  id: 3309,
  sectionName: 'ugh the',
};

export const sampleWithFullData: ICourseSection = {
  id: 6967,
  sectionName: 'hence before',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'woot',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
