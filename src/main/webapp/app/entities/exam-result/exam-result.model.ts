import dayjs from 'dayjs/esm';
import { IStudent } from 'app/entities/student/student.model';
import { IExam } from 'app/entities/exam/exam.model';
import { ICourse } from 'app/entities/course/course.model';

export interface IExamResult {
  id: number;
  point?: number | null;
  gradedDate?: dayjs.Dayjs | null;
  student?: Pick<IStudent, 'id'> | null;
  exam?: Pick<IExam, 'id'> | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewExamResult = Omit<IExamResult, 'id'> & { id: null };
