import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 32058,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 19930,
  submissionDate: dayjs('2024-07-07T16:06'),
  content: 'lap same',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 22230,
  submissionDate: dayjs('2024-07-07T13:33'),
  content: 'depute yet',
  comment: 'modulo wholly since',
  attempsNumber: 28832,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
