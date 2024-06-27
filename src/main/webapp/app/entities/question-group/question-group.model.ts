import { ICourse } from 'app/entities/course/course.model';

export interface IQuestionGroup {
  id: number;
  name?: string | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewQuestionGroup = Omit<IQuestionGroup, 'id'> & { id: null };
