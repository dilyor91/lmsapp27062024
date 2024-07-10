import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 26755,
  questionText: 'ceramics',
};

export const sampleWithPartialData: IQuestion = {
  id: 16628,
  questionText: 'unless without',
};

export const sampleWithFullData: IQuestion = {
  id: 13534,
  questionText: 'toast',
  point: 11367,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'bequeath calmly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
