import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 23962,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 2285,
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 10555,
  fromDate: dayjs('2024-06-27T06:20'),
  endDate: dayjs('2024-06-26T11:55'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
