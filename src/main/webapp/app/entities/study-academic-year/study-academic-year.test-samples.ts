import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 10610,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 8372,
  fromDate: dayjs('2024-06-26T08:55'),
  endDate: dayjs('2024-06-26T21:11'),
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 5468,
  fromDate: dayjs('2024-06-27T05:16'),
  endDate: dayjs('2024-06-26T12:32'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
