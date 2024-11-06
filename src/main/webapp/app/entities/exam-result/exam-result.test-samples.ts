import dayjs from 'dayjs/esm';

import { IExamResult, NewExamResult } from './exam-result.model';

export const sampleWithRequiredData: IExamResult = {
  id: 7433,
};

export const sampleWithPartialData: IExamResult = {
  id: 2263,
  point: 14906.96,
};

export const sampleWithFullData: IExamResult = {
  id: 3771,
  point: 12525.59,
  gradedDate: dayjs('2024-11-05T06:58'),
};

export const sampleWithNewData: NewExamResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
