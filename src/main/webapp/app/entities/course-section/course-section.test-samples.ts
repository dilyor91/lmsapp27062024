import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 11490,
  sectionName: 'appearance stealthily',
};

export const sampleWithPartialData: ICourseSection = {
  id: 30825,
  sectionName: 'noisily',
};

export const sampleWithFullData: ICourseSection = {
  id: 24248,
  sectionName: 'till',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'unless affront educated',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
