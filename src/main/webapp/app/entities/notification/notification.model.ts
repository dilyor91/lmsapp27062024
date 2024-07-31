import dayjs from 'dayjs/esm';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { IAssignment } from 'app/entities/assignment/assignment.model';
import { ISubmissionAssignment } from 'app/entities/submission-assignment/submission-assignment.model';
import { IStudent } from 'app/entities/student/student.model';
import { ITeacher } from 'app/entities/teacher/teacher.model';
import { NotificationType } from 'app/entities/enumerations/notification-type.model';

export interface INotification {
  id: number;
  message?: string | null;
  readDate?: dayjs.Dayjs | null;
  read?: boolean | null;
  notificationType?: keyof typeof NotificationType | null;
  quiz?: Pick<IQuiz, 'id'> | null;
  assignment?: Pick<IAssignment, 'id'> | null;
  submissionAssignment?: Pick<ISubmissionAssignment, 'id'> | null;
  student?: Pick<IStudent, 'id'> | null;
  teacher?: Pick<ITeacher, 'id'> | null;
}

export type NewNotification = Omit<INotification, 'id'> & { id: null };
