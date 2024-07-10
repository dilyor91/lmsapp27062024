import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 26425,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 2128,
  submissionDate: dayjs('2024-07-08T00:08'),
  comment: 'aboard babyish',
  attempsNumber: 16860,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 11464,
  submissionDate: dayjs('2024-07-07T19:10'),
  content: 'with stand',
  comment: 'gadzooks honesty anti',
  attempsNumber: 11944,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
