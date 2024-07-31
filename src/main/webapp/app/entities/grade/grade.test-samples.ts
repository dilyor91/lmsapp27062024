import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 26781,
};

export const sampleWithPartialData: IGrade = {
  id: 4354,
};

export const sampleWithFullData: IGrade = {
  id: 16081,
  point: 15771,
  gradedDate: dayjs('2024-07-09T12:13'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
