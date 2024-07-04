import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 4594,
  questionText: 'potentially ah',
};

export const sampleWithPartialData: IQuestion = {
  id: 28471,
  questionText: 'suddenly',
  point: 3566,
};

export const sampleWithFullData: IQuestion = {
  id: 13433,
  questionText: 'blow',
  point: 11572,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'vanilla bluff',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
