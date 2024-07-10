import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 3385,
};

export const sampleWithPartialData: IGrade = {
  id: 29839,
};

export const sampleWithFullData: IGrade = {
  id: 4255,
  point: 6180,
  gradedDate: dayjs('2024-07-10T01:07'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
