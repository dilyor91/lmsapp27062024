import dayjs from 'dayjs/esm';

import { ISubmissionAssignment, NewSubmissionAssignment } from './submission-assignment.model';

export const sampleWithRequiredData: ISubmissionAssignment = {
  id: 6767,
};

export const sampleWithPartialData: ISubmissionAssignment = {
  id: 8678,
  content: 'uh-huh',
  attempsNumber: 6542,
};

export const sampleWithFullData: ISubmissionAssignment = {
  id: 5103,
  submissionDate: dayjs('2024-07-07T14:54'),
  content: 'deliberately foretell embody',
  comment: 'peony finally',
  attempsNumber: 15943,
};

export const sampleWithNewData: NewSubmissionAssignment = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
