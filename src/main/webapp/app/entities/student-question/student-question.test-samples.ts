import { IStudentQuestion, NewStudentQuestion } from './student-question.model';

export const sampleWithRequiredData: IStudentQuestion = {
  id: 18694,
};

export const sampleWithPartialData: IStudentQuestion = {
  id: 10297,
};

export const sampleWithFullData: IStudentQuestion = {
  id: 18495,
  ordNum: 15430,
};

export const sampleWithNewData: NewStudentQuestion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
