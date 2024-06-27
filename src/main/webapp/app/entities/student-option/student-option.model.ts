import { IStudentQuestion } from 'app/entities/student-question/student-question.model';
import { IOption } from 'app/entities/option/option.model';

export interface IStudentOption {
  id: number;
  ordNum?: number | null;
  studentQuestion?: Pick<IStudentQuestion, 'id'> | null;
  option?: Pick<IOption, 'id'> | null;
}

export type NewStudentOption = Omit<IStudentOption, 'id'> & { id: null };
