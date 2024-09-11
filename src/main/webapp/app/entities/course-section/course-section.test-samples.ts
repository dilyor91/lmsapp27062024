import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 27848,
  sectionName: 'ack below out',
};

export const sampleWithPartialData: ICourseSection = {
  id: 23268,
  sectionName: 'hmph',
};

export const sampleWithFullData: ICourseSection = {
  id: 10627,
  sectionName: 'lest aha',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'given before',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
