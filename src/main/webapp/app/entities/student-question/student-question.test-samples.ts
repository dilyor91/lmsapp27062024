import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 25684,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 2623,
  ordNum: 127,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 18060,
  ordNum: 28517,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
