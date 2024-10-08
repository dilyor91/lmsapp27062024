import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 17296,
  termName: 'oh comb',
  startDate: dayjs('2024-06-28T10:13'),
  endDate: dayjs('2024-06-27T13:15'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 19931,
  termName: 'once shout afore',
  startDate: dayjs('2024-06-28T07:36'),
  endDate: dayjs('2024-06-28T12:21'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 28545,
  termName: 'gosh whereas',
  startDate: dayjs('2024-06-28T11:18'),
  endDate: dayjs('2024-06-27T18:26'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'platter when',
  startDate: dayjs('2024-06-28T05:10'),
  endDate: dayjs('2024-06-27T20:16'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
