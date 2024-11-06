import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 9754,
  sectionName: 'decouple',
};

export const sampleWithPartialData: ICourseSection = {
  id: 16665,
  sectionName: 'quintuple',
};

export const sampleWithFullData: ICourseSection = {
  id: 28705,
  sectionName: 'lamp frantically sham',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'greedily quietly instead',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
