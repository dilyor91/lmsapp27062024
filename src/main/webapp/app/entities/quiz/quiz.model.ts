import { ICourse } from 'app/entities/course/course.model';

export interface IQuiz {
  id: number;
  quizName?: string | null;
  timeInMinute?: number | null;
  published?: boolean | null;
  course?: Pick<ICourse, 'id'> | null;
}

export type NewQuiz = Omit<IQuiz, 'id'> & { id: null };
