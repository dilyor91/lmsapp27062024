import { ICourse } from 'app/entities/course/course.model';
import { IAnnouncement } from 'app/entities/announcement/announcement.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';

export interface ICourseSection {
  id: number;
  sectionName?: string | null;
  course?: Pick<ICourse, 'id'> | null;
  announcements?: Pick<IAnnouncement, 'id'>[] | null;
  assignments?: Pick<IAssignment, 'id'>[] | null;
}

export type NewCourseSection = Omit<ICourseSection, 'id'> & { id: null };
