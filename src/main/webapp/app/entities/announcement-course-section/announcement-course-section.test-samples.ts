import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from './announcement-course-section.model';

export const sampleWithRequiredData: IAnnouncementCourseSection = {
  id: 17681,
};

export const sampleWithPartialData: IAnnouncementCourseSection = {
  id: 2130,
};

export const sampleWithFullData: IAnnouncementCourseSection = {
  id: 320,
};

export const sampleWithNewData: NewAnnouncementCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
