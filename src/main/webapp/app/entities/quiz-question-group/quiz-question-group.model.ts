import { IQuiz } from 'app/entities/quiz/quiz.model';
import { IQuestionGroup } from 'app/entities/question-group/question-group.model';

export interface IQuizQuestionGroup {
  id: number;
  questionCount?: number | null;
  quiz?: Pick<IQuiz, 'id'> | null;
  questionGroup?: Pick<IQuestionGroup, 'id'> | null;
}

export type NewQuizQuestionGroup = Omit<IQuizQuestionGroup, 'id'> & { id: null };
