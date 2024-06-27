import dayjs from 'dayjs/esm';

import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 16066,
  name: 'flat disease',
};

export const sampleWithPartialData: IAssignment = {
  id: 25028,
  name: 'that enchant',
  content: 'thoughtful cautiously',
  allowedAttempts: 32504,
  startDate: dayjs('2024-06-26T07:43'),
  endDate: dayjs('2024-06-26T12:11'),
  dueDate: dayjs('2024-06-26T07:34'),
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 26218,
  name: 'given within busk',
  content: 'youthfully plush',
  points: 18660.45,
  submissionType: 'ONLINE',
  allowedAttempts: 5528,
  startDate: dayjs('2024-06-26T09:17'),
  endDate: dayjs('2024-06-26T17:23'),
  dueDate: dayjs('2024-06-27T03:36'),
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'how',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
