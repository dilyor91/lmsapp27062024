import dayjs from 'dayjs/esm';

import { IStudyAcademicYear, NewStudyAcademicYear } from './study-academic-year.model';

export const sampleWithRequiredData: IStudyAcademicYear = {
  id: 24159,
};

export const sampleWithPartialData: IStudyAcademicYear = {
  id: 21714,
};

export const sampleWithFullData: IStudyAcademicYear = {
  id: 4797,
  fromDate: dayjs('2024-06-26T22:30'),
  endDate: dayjs('2024-06-27T02:12'),
};

export const sampleWithNewData: NewStudyAcademicYear = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
