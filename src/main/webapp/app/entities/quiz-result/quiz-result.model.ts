import { IQuiz } from 'app/entities/quiz/quiz.model';
import { IStudent } from 'app/entities/student/student.model';
import { IQuizSession } from 'app/entities/quiz-session/quiz-session.model';

export interface IQuizResult {
  id: number;
  point?: number | null;
  totalQuestionCnt?: number | null;
  correctAnswerCnt?: number | null;
  wrongAnswerCnt?: number | null;
  quiz?: Pick<IQuiz, 'id'> | null;
  student?: Pick<IStudent, 'id'> | null;
  quizSession?: Pick<IQuizSession, 'id'> | null;
}

export type NewQuizResult = Omit<IQuizResult, 'id'> & { id: null };
