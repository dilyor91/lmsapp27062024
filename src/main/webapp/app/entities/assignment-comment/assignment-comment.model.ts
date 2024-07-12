import dayjs from 'dayjs/esm';
import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { IStudent } from 'app/entities/student/student.model';
import { ITeacher } from 'app/entities/teacher/teacher.model';

export interface IAssignmentComment {
  id: number;
  comment?: string | null;
  commentDate?: dayjs.Dayjs | null;
  submissionAssignment?: Pick<ISubmissionAssignment, 'id'> | null;
  assignment?: Pick<IAssignment, 'id'> | null;
  student?: Pick<IStudent, 'id'> | null;
  teacher?: Pick<ITeacher, 'id'> | null;
}

export type NewAssignmentComment = Omit<IAssignmentComment, 'id'> & { id: null };
