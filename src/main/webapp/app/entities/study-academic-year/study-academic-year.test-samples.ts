import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 6008,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 12135,
  fromDate: dayjs('2024-06-26T17:03'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 16566,
  fromDate: dayjs('2024-06-26T09:53'),
  endDate: dayjs('2024-06-26T12:51'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
