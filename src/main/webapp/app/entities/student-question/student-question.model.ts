import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';
import { IQuestion } from 'app/entities/question/question.model';

export interface IStudentQuestion {
  id: number;
  ordNum?: number | null;
  quizSession?: Pick<IQuizSession, 'id'> | null;
  question?: Pick<IQuestion, 'id'> | null;
}

export type NewStudentQuestion = Omit<IStudentQuestion, 'id'> & { id: null };
