import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 5364,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 3949,
  ordNum: 9678,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 10070,
  ordNum: 28807,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
