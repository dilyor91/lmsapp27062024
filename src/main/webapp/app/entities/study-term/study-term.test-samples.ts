import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 32767,
  termName: 'loads troubled',
  startDate: dayjs('2024-06-27T18:46'),
  endDate: dayjs('2024-06-28T10:20'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 22113,
  termName: 'now',
  startDate: dayjs('2024-06-27T18:21'),
  endDate: dayjs('2024-06-28T01:55'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 4420,
  termName: 'oxidize unnaturally accidentally',
  startDate: dayjs('2024-06-28T07:49'),
  endDate: dayjs('2024-06-27T14:35'),
  status: false,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'tensely roof',
  startDate: dayjs('2024-06-27T21:06'),
  endDate: dayjs('2024-06-27T12:54'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
