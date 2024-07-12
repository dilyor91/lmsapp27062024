import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 10785,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 31002,
  comment: 'worst',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 1228,
  submissionDate: dayjs('2024-07-07T16:55'),
  content: 'lazily yowza near',
  comment: 'whoa righteously',
  attempsNumber: 28176,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
