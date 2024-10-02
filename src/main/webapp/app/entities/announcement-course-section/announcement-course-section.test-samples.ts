import { IAnnouncementCourseSection, NewAnnouncementCourseSection } from './announcement-course-section.model';

export const sampleWithRequiredData: IAnnouncementCourseSection = {
  id: 16197,
};

export const sampleWithPartialData: IAnnouncementCourseSection = {
  id: 2103,
};

export const sampleWithFullData: IAnnouncementCourseSection = {
  id: 12781,
};

export const sampleWithNewData: NewAnnouncementCourseSection = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
