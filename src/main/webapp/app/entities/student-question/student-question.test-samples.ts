import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 23506,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 8424,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 19934,
  ordNum: 9961,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
