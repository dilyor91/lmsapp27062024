import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 2174,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 18326,
  fromDate: dayjs('2024-06-26T22:18'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 18430,
  fromDate: dayjs('2024-06-27T05:57'),
  endDate: dayjs('2024-06-27T01:51'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
