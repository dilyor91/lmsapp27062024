import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 13282,
};

export const sampleWithPartialData: IStudentOption = {
  id: 2534,
};

export const sampleWithFullData: IStudentOption = {
  id: 12095,
  ordNum: 18022,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
