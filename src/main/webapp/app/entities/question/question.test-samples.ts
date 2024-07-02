import { IQuestion, NewQuestion } from './question.model';

export const sampleWithRequiredData: IQuestion = {
  id: 12261,
  questionText: 'though',
};

export const sampleWithPartialData: IQuestion = {
  id: 3580,
  questionText: 'toward',
};

export const sampleWithFullData: IQuestion = {
  id: 11160,
  questionText: 'terrific',
  point: 20347,
};

export const sampleWithNewData: NewQuestion = {
  questionText: 'antique zowie',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
