import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 23280,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 26334,
  ordNum: 1963,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 31715,
  ordNum: 29772,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
