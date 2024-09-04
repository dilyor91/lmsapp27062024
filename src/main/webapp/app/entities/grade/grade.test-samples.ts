import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 12520,
};

export const sampleWithPartialData: IGrade = {
  id: 19233,
  point: 2895,
};

export const sampleWithFullData: IGrade = {
  id: 15490,
  point: 28770,
  gradedDate: dayjs('2024-07-09T16:00'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
