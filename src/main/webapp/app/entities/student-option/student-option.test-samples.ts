import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 322,
};

export const sampleWithPartialData: IStudentOption = {
  id: 7116,
  ordNum: 27004,
};

export const sampleWithFullData: IStudentOption = {
  id: 1214,
  ordNum: 21718,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
