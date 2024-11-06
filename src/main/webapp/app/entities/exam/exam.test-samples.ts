import { IExam, NewExam } from './exam.model';

export const sampleWithRequiredData: IExam = {
  id: 13939,
};

export const sampleWithPartialData: IExam = {
  id: 19748,
  type: 'INTERIM',
};

export const sampleWithFullData: IExam = {
  id: 2253,
  type: 'INTERIM',
  maxPoint: 8577.6,
};

export const sampleWithNewData: NewExam = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
