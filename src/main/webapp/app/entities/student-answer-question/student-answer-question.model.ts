import { IQuestion } from 'app/entities/question/question.model';
import { IOption } from 'app/entities/option/option.model';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';

export interface IStudentAnswerQuestion {
  id: number;
  isCorrect?: boolean | null;
  question?: Pick<IQuestion, 'id'> | null;
  option?: Pick<IOption, 'id'> | null;
  quizSession?: Pick<IQuizSession, 'id'> | null;
}

export type NewStudentAnswerQuestion = Omit<IStudentAnswerQuestion, 'id'> & { id: null };
