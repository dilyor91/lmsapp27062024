import { ICourse } from 'app/entities/course/course.model';
import { IAnnouncement } from 'app/entities/announcement/announcement.model';

export interface ICourseSection {
  id: number;
  sectionName?: string | null;
  course?: Pick<ICourse, 'id'> | null;
  announcements?: Pick<IAnnouncement, 'id'>[] | null;
}

export type NewCourseSection = Omit<ICourseSection, 'id'> & { id: null };
