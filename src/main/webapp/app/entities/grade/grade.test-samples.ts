import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 17105,
};

export const sampleWithPartialData: IGrade = {
  id: 14077,
  point: 17724,
};

export const sampleWithFullData: IGrade = {
  id: 12910,
  point: 4713,
  gradedDate: dayjs('2024-07-09T11:35'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
