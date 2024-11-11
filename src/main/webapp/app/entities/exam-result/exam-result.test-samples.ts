import dayjs from 'dayjs/esm';

import { IExamResult, NewExamResult } from './exam-result.model';

export const sampleWithRequiredData: IExamResult = {
  id: 32289,
};

export const sampleWithPartialData: IExamResult = {
  id: 1129,
  point: 30278.35,
};

export const sampleWithFullData: IExamResult = {
  id: 10144,
  point: 15075.85,
  gradedDate: dayjs('2024-11-05T08:01'),
};

export const sampleWithNewData: NewExamResult = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
