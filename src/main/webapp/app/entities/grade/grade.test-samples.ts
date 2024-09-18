import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 10790,
};

export const sampleWithPartialData: IGrade = {
  id: 28573,
  point: 15441,
};

export const sampleWithFullData: IGrade = {
  id: 22332,
  point: 29246,
  gradedDate: dayjs('2024-07-09T21:20'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
