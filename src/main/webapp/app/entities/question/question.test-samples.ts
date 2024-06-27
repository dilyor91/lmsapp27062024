import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 7008,
  questionText: 'even',
};

export const sampleWithPartialData: IQuestion = {
  id: 22439,
  questionText: 'naming frankly',
};

export const sampleWithFullData: IQuestion = {
  id: 1596,
  questionText: 'why',
  point: 4642,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'needy who besides',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
