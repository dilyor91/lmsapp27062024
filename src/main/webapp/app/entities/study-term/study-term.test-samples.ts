import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 24327,
  termName: 'eye',
  startDate: dayjs('2024-06-28T05:57'),
  endDate: dayjs('2024-06-28T02:54'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 13188,
  termName: 'pish vastly',
  startDate: dayjs('2024-06-27T23:23'),
  endDate: dayjs('2024-06-28T01:10'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 19425,
  termName: 'besides circadian',
  startDate: dayjs('2024-06-28T01:06'),
  endDate: dayjs('2024-06-28T11:38'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'difference whoa',
  startDate: dayjs('2024-06-27T18:53'),
  endDate: dayjs('2024-06-27T12:48'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
