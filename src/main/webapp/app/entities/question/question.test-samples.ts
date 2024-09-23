import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 20176,
  questionText: 'bah',
};

export const sampleWithPartialData: IQuestion = {
  id: 16123,
  questionText: 'gadzooks disapprove',
};

export const sampleWithFullData: IQuestion = {
  id: 32203,
  questionText: 'place honestly briskly',
  point: 7021,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'improbable mash what',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
