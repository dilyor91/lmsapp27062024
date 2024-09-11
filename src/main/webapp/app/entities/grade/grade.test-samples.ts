import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 21818,
};

export const sampleWithPartialData: IGrade = {
  id: 25546,
};

export const sampleWithFullData: IGrade = {
  id: 23378,
  point: 8835,
  gradedDate: dayjs('2024-07-10T04:58'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
