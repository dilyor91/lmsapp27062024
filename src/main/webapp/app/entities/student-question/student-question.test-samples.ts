import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 15064,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 13530,
  ordNum: 21177,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 18244,
  ordNum: 31271,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
