import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 23484,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 7092,
  ordNum: 17798,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 18511,
  ordNum: 15585,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
