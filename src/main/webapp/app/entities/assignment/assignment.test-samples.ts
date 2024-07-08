import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 6129,
  name: 'safari who daily',
};

export const sampleWithPartialData: IAssignment = {
  id: 22235,
  name: 'pace misread',
  points: 17840.88,
  submissionType: 'PAPER',
  published: false,
};

export const sampleWithFullData: IAssignment = {
  id: 14315,
  name: 'after of',
  content: 'though distributor',
  points: 17277.21,
  submissionType: 'PAPER',
  allowedAttempts: 3055,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'yum',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
