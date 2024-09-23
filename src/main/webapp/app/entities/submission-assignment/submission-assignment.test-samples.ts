import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 24850,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 25361,
  submissionDate: dayjs('2024-07-08T03:38'),
  content: 'uh-huh and',
  comment: 'officially',
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 4962,
  submissionDate: dayjs('2024-07-08T04:50'),
  content: 'fatally till',
  comment: 'celsius gracefully although',
  attempsNumber: 28111,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
