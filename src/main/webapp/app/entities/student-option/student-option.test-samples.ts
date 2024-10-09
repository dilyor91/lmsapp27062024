import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 1519,
};

export const sampleWithPartialData: IStudentOption = {
  id: 15976,
};

export const sampleWithFullData: IStudentOption = {
  id: 23105,
  ordNum: 24203,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
