import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 3956,
  sectionName: 'boo that belay',
};

export const sampleWithPartialData: ICourseSection = {
  id: 1573,
  sectionName: 'yahoo behind whenever',
};

export const sampleWithFullData: ICourseSection = {
  id: 20473,
  sectionName: 'properly bilk',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'concerning consequently cause',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
