import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 11293,
  sectionName: 'lest the bashfully',
};

export const sampleWithPartialData: ICourseSection = {
  id: 3901,
  sectionName: 'weekly try sunny',
};

export const sampleWithFullData: ICourseSection = {
  id: 11650,
  sectionName: 'because',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'ha bother roughly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
