import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 23132,
  questionText: 'damp candidate',
};

export const sampleWithPartialData: IQuestion = {
  id: 30386,
  questionText: 'onto psst aperitif',
};

export const sampleWithFullData: IQuestion = {
  id: 10514,
  questionText: 'welly instead',
  point: 21646,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'um as',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
