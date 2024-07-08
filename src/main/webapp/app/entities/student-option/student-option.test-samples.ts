import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 11753,
};

export const sampleWithPartialData: IStudentOption = {
  id: 4407,
  ordNum: 18476,
};

export const sampleWithFullData: IStudentOption = {
  id: 5209,
  ordNum: 3220,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
