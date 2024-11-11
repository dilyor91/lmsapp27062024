import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 32603,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 18147,
  fromDate: dayjs('2024-06-27T01:50'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 6706,
  fromDate: dayjs('2024-06-26T06:53'),
  endDate: dayjs('2024-06-26T23:01'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
