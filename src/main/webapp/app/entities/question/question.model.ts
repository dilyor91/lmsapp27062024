import { IQuestionGroup } from 'app/entities/question-group/question-group.model';

export interface IQuestion {
  id: number;
  questionText?: string | null;
  point?: number | null;
  questionGroup?: Pick<IQuestionGroup, 'id'> | null;
}

export type NewQuestion = Omit<IQuestion, 'id'> & { id: null };
