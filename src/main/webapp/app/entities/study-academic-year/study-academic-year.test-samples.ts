import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 23731,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 32205,
  endDate: dayjs('2024-06-27T05:14'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 30255,
  fromDate: dayjs('2024-06-26T13:40'),
  endDate: dayjs('2024-06-26T06:42'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
