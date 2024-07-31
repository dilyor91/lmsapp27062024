import { IStudentOption, NewStudentOption } from './student-option.model';

export const sampleWithRequiredData: IStudentOption = {
  id: 6905,
};

export const sampleWithPartialData: IStudentOption = {
  id: 18706,
  ordNum: 18398,
};

export const sampleWithFullData: IStudentOption = {
  id: 24934,
  ordNum: 2048,
};

export const sampleWithNewData: NewStudentOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
