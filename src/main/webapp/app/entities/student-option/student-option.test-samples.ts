import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 26206,
};

export const sampleWithPartialData: IStudentOption = {
  id: 11943,
  ordNum: 23997,
};

export const sampleWithFullData: IStudentOption = {
  id: 132,
  ordNum: 20184,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
