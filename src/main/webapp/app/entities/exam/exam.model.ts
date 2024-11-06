import { ICourse } from 'app/entities/course/course.model';
import { ExamTypeEnum } from 'app/entities/enumerations/exam-type-enum.model';

export interface IExam {
  id: number;
  type?: keyof typeof ExamTypeEnum | null;
  maxPoint?: number | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewExam = Omit<IExam, 'id'> & { id: null };
