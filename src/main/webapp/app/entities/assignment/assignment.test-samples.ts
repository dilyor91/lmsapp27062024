import dayjs from 'dayjs/esm';

import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 28677,
  name: 'smoothly ginseng contract',
};

export const sampleWithPartialData: IAssignment = {
  id: 20364,
  name: 'mulch for drat',
  content: 'amongst ouch wisely',
  submissionType: 'PAPER',
  startDate: dayjs('2024-06-27T03:44'),
  endDate: dayjs('2024-06-26T23:50'),
  dueDate: dayjs('2024-06-26T08:29'),
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 28443,
  name: 'oregano',
  content: 'drag merge',
  points: 25743.57,
  submissionType: 'ONLINE',
  allowedAttempts: 6195,
  startDate: dayjs('2024-06-26T18:15'),
  endDate: dayjs('2024-06-27T01:10'),
  dueDate: dayjs('2024-06-26T07:16'),
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'yearly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
