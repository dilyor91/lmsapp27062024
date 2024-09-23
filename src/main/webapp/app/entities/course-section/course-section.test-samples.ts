import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 32689,
  sectionName: 'adjourn hundred',
};

export const sampleWithPartialData: ICourseSection = {
  id: 13046,
  sectionName: 'frenetically',
};

export const sampleWithFullData: ICourseSection = {
  id: 1757,
  sectionName: 'relieve likewise',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'duh foot ponder',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
