import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from './announcement-course-section.model';

export const sampleWithRequiredData: IAnnouncementCourseSection = {
  id: 21645,
};

export const sampleWithPartialData: IAnnouncementCourseSection = {
  id: 8918,
};

export const sampleWithFullData: IAnnouncementCourseSection = {
  id: 22248,
};

export const sampleWithNewData: NewAnnouncementCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
