import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 459,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 24331,
  content: 'daddy milky',
  attempsNumber: 7258,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 30340,
  submissionDate: dayjs('2024-07-08T03:44'),
  content: 'huzzah pillbox',
  comment: 'pish',
  attempsNumber: 1686,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
