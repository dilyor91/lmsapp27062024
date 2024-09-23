import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 31501,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 11768,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 4190,
  ordNum: 30678,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
