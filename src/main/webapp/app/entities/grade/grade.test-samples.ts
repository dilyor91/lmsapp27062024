import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 1517,
};

export const sampleWithPartialData: IGrade = {
  id: 17255,
};

export const sampleWithFullData: IGrade = {
  id: 18203,
  point: 8907,
  gradedDate: dayjs('2024-07-09T19:38'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
