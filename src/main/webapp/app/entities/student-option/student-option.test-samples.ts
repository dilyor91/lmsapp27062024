import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 24431,
};

export const sampleWithPartialData: IStudentOption = {
  id: 30053,
};

export const sampleWithFullData: IStudentOption = {
  id: 19452,
  ordNum: 25064,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
