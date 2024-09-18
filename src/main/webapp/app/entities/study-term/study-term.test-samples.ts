import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 1814,
  termName: 'apt garlic unless',
  startDate: dayjs('2024-06-28T11:28'),
  endDate: dayjs('2024-06-27T20:03'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 9694,
  termName: 'versus melt affidavit',
  startDate: dayjs('2024-06-27T16:10'),
  endDate: dayjs('2024-06-27T17:54'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 7155,
  termName: 'whorl',
  startDate: dayjs('2024-06-27T13:55'),
  endDate: dayjs('2024-06-28T06:38'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'saving thrifty',
  startDate: dayjs('2024-06-28T00:52'),
  endDate: dayjs('2024-06-28T09:01'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
