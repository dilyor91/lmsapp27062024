import dayjs from 'dayjs/esm';
import { IStudent } from 'app/entities/student/student.model';
import { ICourse } from 'app/entities/course/course.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { IAttachment } from 'app/entities/attachment/attachment.model';

export interface ISubmissionAssignment {
  id: number;
  submissionDate?: dayjs.Dayjs | null;
  content?: string | null;
  comment?: string | null;
  attempsNumber?: number | null;
  student?: Pick<IStudent, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
  assignment?: Pick<IAssignment, 'id'> | null;
  attachment?: Pick<IAttachment, 'id'> | null;
}

export type NewSubmissionAssignment = Omit<ISubmissionAssignment, 'id'> & { id: null };
