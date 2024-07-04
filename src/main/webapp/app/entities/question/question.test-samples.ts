import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 2223,
  questionText: 'acidly even yowza',
};

export const sampleWithPartialData: IQuestion = {
  id: 26373,
  questionText: 'crossly',
  point: 1924,
};

export const sampleWithFullData: IQuestion = {
  id: 16611,
  questionText: 'throughout append',
  point: 30436,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'as worst forsaken',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
