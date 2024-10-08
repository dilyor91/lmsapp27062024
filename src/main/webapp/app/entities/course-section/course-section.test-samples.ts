import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 27241,
  sectionName: 'posh duh',
};

export const sampleWithPartialData: ICourseSection = {
  id: 14227,
  sectionName: 'gift ah alienated',
};

export const sampleWithFullData: ICourseSection = {
  id: 14247,
  sectionName: 'among trust',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'dead oof',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
