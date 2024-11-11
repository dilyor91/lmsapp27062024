import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 15416,
  questionText: 'fooey quaintly lovingly',
};

export const sampleWithPartialData: IQuestion = {
  id: 18967,
  questionText: 'loosely hmph',
  point: 25882,
};

export const sampleWithFullData: IQuestion = {
  id: 3348,
  questionText: 'nun wherever',
  point: 22813,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'whenever waterlogged eek',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
