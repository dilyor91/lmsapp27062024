import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 30094,
};

export const sampleWithPartialData: IStudentOption = {
  id: 5909,
};

export const sampleWithFullData: IStudentOption = {
  id: 16511,
  ordNum: 364,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
