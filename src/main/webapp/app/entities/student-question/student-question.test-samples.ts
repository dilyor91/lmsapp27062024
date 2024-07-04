import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 32018,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 17792,
  ordNum: 2356,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 23704,
  ordNum: 16684,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
