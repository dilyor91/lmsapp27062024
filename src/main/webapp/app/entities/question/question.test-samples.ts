import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 11785,
  questionText: 'stir-fry apropos',
};

export const sampleWithPartialData: IQuestion = {
  id: 18215,
  questionText: 'peter',
  point: 12302,
};

export const sampleWithFullData: IQuestion = {
  id: 835,
  questionText: 'slump phooey whitewash',
  point: 16982,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'querulous tank etch',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
