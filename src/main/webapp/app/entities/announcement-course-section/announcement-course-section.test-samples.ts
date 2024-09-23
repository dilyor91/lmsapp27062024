import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from './announcement-course-section.model';

export const sampleWithRequiredData: IAnnouncementCourseSection = {
  id: 29022,
};

export const sampleWithPartialData: IAnnouncementCourseSection = {
  id: 9067,
};

export const sampleWithFullData: IAnnouncementCourseSection = {
  id: 15367,
};

export const sampleWithNewData: NewAnnouncementCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
