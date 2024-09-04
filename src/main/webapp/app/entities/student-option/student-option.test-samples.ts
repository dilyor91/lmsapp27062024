import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 17560,
};

export const sampleWithPartialData: IStudentOption = {
  id: 29228,
  ordNum: 15534,
};

export const sampleWithFullData: IStudentOption = {
  id: 6215,
  ordNum: 22187,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
