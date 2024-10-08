import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 2969,
};

export const sampleWithPartialData: IStudentOption = {
  id: 31399,
};

export const sampleWithFullData: IStudentOption = {
  id: 20787,
  ordNum: 3092,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
