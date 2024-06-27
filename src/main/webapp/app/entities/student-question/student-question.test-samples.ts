import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 19531,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 29216,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 5982,
  ordNum: 20923,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
