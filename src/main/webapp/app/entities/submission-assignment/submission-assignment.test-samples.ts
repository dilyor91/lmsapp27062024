import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 26272,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 24658,
  submissionDate: dayjs('2024-07-07T11:46'),
  content: 'savannah',
  comment: 'nearly tenderly mustache',
  attempsNumber: 5367,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 26322,
  submissionDate: dayjs('2024-07-08T04:21'),
  content: 'third nor but',
  comment: 'reverse',
  attempsNumber: 28302,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
