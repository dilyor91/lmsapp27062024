import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 31301,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 9122,
  submissionDate: dayjs('2024-07-07T17:27'),
  attempsNumber: 24932,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 21100,
  submissionDate: dayjs('2024-07-07T09:51'),
  content: 'deeply yowza',
  comment: 'finally',
  attempsNumber: 29651,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
