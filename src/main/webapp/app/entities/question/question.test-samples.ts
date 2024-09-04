import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 7549,
  questionText: 'below the immediate',
};

export const sampleWithPartialData: IQuestion = {
  id: 3311,
  questionText: 'openly',
};

export const sampleWithFullData: IQuestion = {
  id: 24891,
  questionText: 'yet',
  point: 27792,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'meanwhile under finally',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
