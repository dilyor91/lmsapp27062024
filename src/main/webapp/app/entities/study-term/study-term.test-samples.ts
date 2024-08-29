import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 12428,
  termName: 'whose',
  startDate: dayjs('2024-06-27T19:29'),
  endDate: dayjs('2024-06-27T21:37'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 21504,
  termName: 'stealthily now finesse',
  startDate: dayjs('2024-06-27T20:19'),
  endDate: dayjs('2024-06-28T07:54'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 28222,
  termName: 'rundown discourage',
  startDate: dayjs('2024-06-27T21:58'),
  endDate: dayjs('2024-06-27T14:07'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'questioningly ultimately third',
  startDate: dayjs('2024-06-28T10:41'),
  endDate: dayjs('2024-06-28T07:38'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
