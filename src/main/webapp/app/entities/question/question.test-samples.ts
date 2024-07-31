import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 16809,
  questionText: 'swim',
};

export const sampleWithPartialData: IQuestion = {
  id: 16445,
  questionText: 'interestingly inlay',
  point: 22662,
};

export const sampleWithFullData: IQuestion = {
  id: 14494,
  questionText: 'cause',
  point: 478,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'finally concerned neat',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
