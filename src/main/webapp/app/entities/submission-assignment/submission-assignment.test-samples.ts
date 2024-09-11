import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 15898,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 19575,
  submissionDate: dayjs('2024-07-07T18:22'),
  comment: 'hm',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 17381,
  submissionDate: dayjs('2024-07-07T21:47'),
  content: 'but',
  comment: 'gah now',
  attempsNumber: 24527,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
