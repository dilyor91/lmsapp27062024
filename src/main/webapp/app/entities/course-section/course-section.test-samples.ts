import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 28055,
  sectionName: 'terraform yieldingly above',
};

export const sampleWithPartialData: ICourseSection = {
  id: 28188,
  sectionName: 'small braid',
};

export const sampleWithFullData: ICourseSection = {
  id: 14853,
  sectionName: 'circle pish publicize',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'sermon',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
