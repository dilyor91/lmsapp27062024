import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 10435,
  questionText: 'glove inasmuch yum',
};

export const sampleWithPartialData: IQuestion = {
  id: 19014,
  questionText: 'separation label afflict',
  point: 14508,
};

export const sampleWithFullData: IQuestion = {
  id: 29184,
  questionText: 'vivaciously supposing stud',
  point: 10102,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'refuel',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
