import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 12756,
  questionText: 'joyfully',
};

export const sampleWithPartialData: IQuestion = {
  id: 930,
  questionText: 'defiantly freely er',
  point: 25700,
};

export const sampleWithFullData: IQuestion = {
  id: 24386,
  questionText: 'minus',
  point: 12560,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'dependable',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
