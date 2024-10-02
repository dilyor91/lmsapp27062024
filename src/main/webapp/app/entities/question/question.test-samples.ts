import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 16101,
  questionText: 'yesterday silk yuck',
};

export const sampleWithPartialData: IQuestion = {
  id: 25219,
  questionText: 'malfunction decouple',
  point: 633,
};

export const sampleWithFullData: IQuestion = {
  id: 8479,
  questionText: 'shyly',
  point: 8580,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'mild blond bah',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
