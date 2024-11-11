import dayjs from 'dayjs/esm';

import { IGrade, NewGrade } from './grade.model';

export const sampleWithRequiredData: IGrade = {
  id: 20171,
};

export const sampleWithPartialData: IGrade = {
  id: 17093,
};

export const sampleWithFullData: IGrade = {
  id: 5512,
  point: 16159,
  gradedDate: dayjs('2024-07-09T21:15'),
};

export const sampleWithNewData: NewGrade = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
