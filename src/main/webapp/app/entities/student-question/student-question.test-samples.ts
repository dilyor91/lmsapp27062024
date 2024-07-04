import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 18664,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 16002,
  ordNum: 11518,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 27378,
  ordNum: 18082,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
