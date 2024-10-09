import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 31231,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 30927,
  comment: 'affiliate mid',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 16790,
  submissionDate: dayjs('2024-07-07T13:11'),
  content: 'gadzooks tricky abnormally',
  comment: 'space',
  attempsNumber: 20956,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
