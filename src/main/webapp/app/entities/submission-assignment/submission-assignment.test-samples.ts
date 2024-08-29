import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 7303,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 18795,
  content: 'yieldingly',
  comment: 'basis fully correctly',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 28671,
  submissionDate: dayjs('2024-07-07T11:53'),
  content: 'throughout how relay',
  comment: 'pfft',
  attempsNumber: 30955,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
