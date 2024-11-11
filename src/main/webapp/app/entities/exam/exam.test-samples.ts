import { IExam, NewExam } from './exam.model';

export const sampleWithRequiredData: IExam = {
  id: 26694,
};

export const sampleWithPartialData: IExam = {
  id: 27459,
};

export const sampleWithFullData: IExam = {
  id: 16800,
  type: 'FINAL',
  maxPoint: 7098.34,
};

export const sampleWithNewData: NewExam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
