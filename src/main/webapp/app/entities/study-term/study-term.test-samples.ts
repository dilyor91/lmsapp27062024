import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 4385,
  termName: 'applaud neatly unto',
  startDate: dayjs('2024-06-28T07:01'),
  endDate: dayjs('2024-06-28T09:20'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 17777,
  termName: 'ukulele',
  startDate: dayjs('2024-06-28T01:32'),
  endDate: dayjs('2024-06-27T19:25'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 20425,
  termName: 'enrollment wherever',
  startDate: dayjs('2024-06-27T13:04'),
  endDate: dayjs('2024-06-28T01:54'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'disapprove',
  startDate: dayjs('2024-06-28T01:20'),
  endDate: dayjs('2024-06-28T02:55'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
