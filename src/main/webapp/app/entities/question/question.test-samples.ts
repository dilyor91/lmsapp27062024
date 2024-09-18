import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 1084,
  questionText: 'gleam under',
};

export const sampleWithPartialData: IQuestion = {
  id: 3900,
  questionText: 'out commune',
  point: 19706,
};

export const sampleWithFullData: IQuestion = {
  id: 10210,
  questionText: 'incidentally',
  point: 15210,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'eek terrific whether',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
