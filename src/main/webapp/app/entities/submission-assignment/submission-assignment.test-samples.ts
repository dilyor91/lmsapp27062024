import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 28114,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 7356,
  submissionDate: dayjs('2024-07-08T08:10'),
  content: 'brr aw duck',
  comment: 'disastrous meanwhile um',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 29836,
  submissionDate: dayjs('2024-07-08T06:03'),
  content: 'though',
  comment: 'barring ouch reorganize',
  attempsNumber: 20655,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
