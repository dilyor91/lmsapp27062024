import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 4358,
  sectionName: 'questioningly',
};

export const sampleWithPartialData: ICourseSection = {
  id: 3822,
  sectionName: 'during worth',
};

export const sampleWithFullData: ICourseSection = {
  id: 1567,
  sectionName: 'furiously',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'toward',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
