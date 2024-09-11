import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from './announcement-course-section.model';

export const sampleWithRequiredData: IAnnouncementCourseSection = {
  id: 13424,
};

export const sampleWithPartialData: IAnnouncementCourseSection = {
  id: 28912,
};

export const sampleWithFullData: IAnnouncementCourseSection = {
  id: 4521,
};

export const sampleWithNewData: NewAnnouncementCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
