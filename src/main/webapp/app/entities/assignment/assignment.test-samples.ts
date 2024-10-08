import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 22066,
  name: 'phew giving',
};

export const sampleWithPartialData: IAssignment = {
  id: 2662,
  name: 'wrong',
  content: 'minion bench helpful',
  points: 4083.02,
  submissionType: 'ONLINE',
};

export const sampleWithFullData: IAssignment = {
  id: 17299,
  name: 'weep soupy',
  content: 'maintainer boo meal',
  points: 28914.33,
  submissionType: 'PAPER',
  allowedAttempts: 18538,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'silk inside',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
