import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 16063,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 29624,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 26365,
  ordNum: 1722,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
