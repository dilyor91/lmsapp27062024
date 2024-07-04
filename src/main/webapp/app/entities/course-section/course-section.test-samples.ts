import { ICourseSection, NewCourseSection } from './course-section.model';

export const sampleWithRequiredData: ICourseSection = {
  id: 11869,
  sectionName: 'watery intensely footstep',
};

export const sampleWithPartialData: ICourseSection = {
  id: 2350,
  sectionName: 'incision helpfully whereas',
};

export const sampleWithFullData: ICourseSection = {
  id: 24395,
  sectionName: 'reprimand loftily',
};

export const sampleWithNewData: NewCourseSection = {
  sectionName: 'downgrade drop without',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
