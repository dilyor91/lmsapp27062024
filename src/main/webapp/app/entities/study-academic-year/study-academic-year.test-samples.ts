import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 23552,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 4759,
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 24843,
  fromDate: dayjs('2024-06-26T11:49'),
  endDate: dayjs('2024-06-26T22:27'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
