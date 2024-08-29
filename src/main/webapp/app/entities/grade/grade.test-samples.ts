import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 23801,
};

export const sampleWithPartialData: IGrade = {
  id: 15022,
  point: 17905,
};

export const sampleWithFullData: IGrade = {
  id: 30671,
  point: 18302,
  gradedDate: dayjs('2024-07-09T22:41'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
