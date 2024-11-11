import dayjs from 'dayjs/esm';

import { IStudyTerm, NewStudyTerm } from './study-term.model';

export const sampleWithRequiredData: IStudyTerm = {
  id: 17169,
  termName: 'essay to',
  startDate: dayjs('2024-06-28T07:07'),
  endDate: dayjs('2024-06-27T21:06'),
  status: false,
};

export const sampleWithPartialData: IStudyTerm = {
  id: 26290,
  termName: 'whoa',
  startDate: dayjs('2024-06-27T19:30'),
  endDate: dayjs('2024-06-28T09:41'),
  status: false,
};

export const sampleWithFullData: IStudyTerm = {
  id: 30553,
  termName: 'yuck',
  startDate: dayjs('2024-06-28T03:05'),
  endDate: dayjs('2024-06-28T03:01'),
  status: true,
};

export const sampleWithNewData: NewStudyTerm = {
  termName: 'yahoo yippee',
  startDate: dayjs('2024-06-28T10:16'),
  endDate: dayjs('2024-06-27T17:28'),
  status: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
