import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 5287,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 21782,
  endDate: dayjs('2024-06-27T00:53'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 8826,
  fromDate: dayjs('2024-06-26T21:48'),
  endDate: dayjs('2024-06-27T03:30'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
