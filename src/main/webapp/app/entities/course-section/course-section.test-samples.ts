import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 5842,
  sectionName: 'perfectly anenst',
};

export const sampleWithPartialData: ICourseSection = {
  id: 27430,
  sectionName: 'before resume seabass',
};

export const sampleWithFullData: ICourseSection = {
  id: 1534,
  sectionName: 'foolishly creamy',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'choice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
