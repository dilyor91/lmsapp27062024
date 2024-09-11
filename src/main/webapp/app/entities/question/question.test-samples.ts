import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 30662,
  questionText: 'aha absentmindedly aha',
};

export const sampleWithPartialData: IQuestion = {
  id: 6249,
  questionText: 'footage',
};

export const sampleWithFullData: IQuestion = {
  id: 2632,
  questionText: 'vaguely',
  point: 32482,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'kilt yippee arbitrate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
