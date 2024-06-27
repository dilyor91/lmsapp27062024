import dayjs from 'dayjs/esm';
import { IStudent } from 'app/entities/student/student.model';
import { IQuiz } from 'app/entities/quiz/quiz.model';
import { QuizSessionEnum } from 'app/entities/enumerations/quiz-session-enum.model';

export interface IQuizSession {
  id: number;
  startTime?: dayjs.Dayjs | null;
  endTime?: dayjs.Dayjs | null;
  quizSessionEnum?: keyof typeof QuizSessionEnum | null;
  student?: Pick<IStudent, 'id'> | null;
  quiz?: Pick<IQuiz, 'id'> | null;
}

export type NewQuizSession = Omit<IQuizSession, 'id'> & { id: null };
