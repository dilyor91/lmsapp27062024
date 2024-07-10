import dayjs from 'dayjs/esm';
import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';

export interface IGrade {
  id: number;
  point?: number | null;
  gradedDate?: dayjs.Dayjs | null;
  submissionAssignment?: Pick<ISubmissionAssignment, 'id'> | null;
  teacher?: Pick<ITeacher, 'id'> | null;
  assignment?: Pick<IAssignment, 'id'> | null;
}

export type NewGrade = Omit<IGrade, 'id'> & { id: null };
