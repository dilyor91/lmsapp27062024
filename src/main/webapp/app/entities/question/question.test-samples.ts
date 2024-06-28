import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 28546,
  questionText: 'amongst',
};

export const sampleWithPartialData: IQuestion = {
  id: 20755,
  questionText: 'snicker',
};

export const sampleWithFullData: IQuestion = {
  id: 3560,
  questionText: 'muddy',
  point: 27282,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'unlike aw calculating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
