import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 7013,
  termName: 'transfer whose equally',
  startDate: dayjs('2024-06-27T20:46'),
  endDate: dayjs('2024-06-28T08:51'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 19934,
  termName: 'up phooey ah',
  startDate: dayjs('2024-06-28T11:57'),
  endDate: dayjs('2024-06-28T04:43'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 22582,
  termName: 'mortally fear likewise',
  startDate: dayjs('2024-06-28T08:51'),
  endDate: dayjs('2024-06-28T04:53'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'wretched dinner',
  startDate: dayjs('2024-06-28T10:32'),
  endDate: dayjs('2024-06-28T06:06'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
