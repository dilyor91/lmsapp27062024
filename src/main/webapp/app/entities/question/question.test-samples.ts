import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 31325,
  questionText: 'fluctuate',
};

export const sampleWithPartialData: IQuestion = {
  id: 22407,
  questionText: 'litter anguished amend',
};

export const sampleWithFullData: IQuestion = {
  id: 30154,
  questionText: 'after lampoon than',
  point: 2909,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'as runway ugh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
