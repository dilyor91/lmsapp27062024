import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 6623,
};

export const sampleWithPartialData: IGrade = {
  id: 31822,
};

export const sampleWithFullData: IGrade = {
  id: 2843,
  point: 11854,
  gradedDate: dayjs('2024-07-10T05:40'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
