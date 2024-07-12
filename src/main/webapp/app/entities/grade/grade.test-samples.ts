import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 12856,
};

export const sampleWithPartialData: IGrade = {
  id: 1730,
  point: 21601,
};

export const sampleWithFullData: IGrade = {
  id: 4242,
  point: 25881,
  gradedDate: dayjs('2024-07-09T12:49'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
