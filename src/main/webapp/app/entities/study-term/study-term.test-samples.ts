import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 6922,
  termName: 'green once knowledgeably',
  startDate: dayjs('2024-06-28T02:48'),
  endDate: dayjs('2024-06-28T06:41'),
  status: true,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 20481,
  termName: 'near',
  startDate: dayjs('2024-06-28T02:27'),
  endDate: dayjs('2024-06-27T22:52'),
  status: true,
};

export const sampleWithFullData: IStudyTerm = {
  id: 8883,
  termName: 'deep',
  startDate: dayjs('2024-06-28T04:06'),
  endDate: dayjs('2024-06-28T03:09'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'pish towel moult',
  startDate: dayjs('2024-06-28T06:37'),
  endDate: dayjs('2024-06-28T07:39'),
  status: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
