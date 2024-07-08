import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 10727,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 31394,
  submissionDate: dayjs('2024-07-07T23:59'),
  attempsNumber: 14543,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 11644,
  submissionDate: dayjs('2024-07-07T23:57'),
  content: 'honestly',
  comment: 'octave manifestation speedily',
  attempsNumber: 18600,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
