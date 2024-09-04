import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { ICourse } from 'app/entities/course/course.model';
import { ICourseSection } from 'app/entities/course-section/course-section.model';

export interface IAnnouncementCourseSection {
  id: number;
  announcement?: Pick<IAnnouncement, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
  courseSection?: Pick<ICourseSection, 'id'> | null;
}

export type NewAnnouncementCourseSection = Omit<IAnnouncementCourseSection, 'id'> & { id: null };
