import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 14351,
};

export const sampleWithPartialData: IGrade = {
  id: 13992,
  point: 21104,
};

export const sampleWithFullData: IGrade = {
  id: 3636,
  point: 22918,
  gradedDate: dayjs('2024-07-09T08:23'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
