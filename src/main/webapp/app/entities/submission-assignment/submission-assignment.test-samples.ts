import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 8443,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 19090,
  submissionDate: dayjs('2024-07-07T14:37'),
  content: 'hopelessly',
  comment: 'pull deed familiar',
  attempsNumber: 7199,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 11380,
  submissionDate: dayjs('2024-07-08T00:37'),
  content: 'ride',
  comment: 'eulogise dandelion',
  attempsNumber: 11019,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
