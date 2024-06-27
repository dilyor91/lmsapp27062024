import { IQuestion } from 'app/entities/question/question.model';

export interface IOption {
  id: number;
  optionText?: string | null;
  isCorrect?: boolean | null;
  question?: Pick<IQuestion, 'id'> | null;
}

export type NewOption = Omit<IOption, 'id'> & { id: null };
