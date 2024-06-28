import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 16597,
  sectionName: 'as wraparound',
};

export const sampleWithPartialData: ICourseSection = {
  id: 28865,
  sectionName: 'gadzooks er waterfall',
};

export const sampleWithFullData: ICourseSection = {
  id: 24755,
  sectionName: 'curiously fidget',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'after disbelieve',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
