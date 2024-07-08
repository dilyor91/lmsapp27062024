import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 19945,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 8407,
  ordNum: 15000,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 13996,
  ordNum: 31404,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
