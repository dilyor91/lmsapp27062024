import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 31123,
  name: 'pleasant naive',
};

export const sampleWithPartialData: IAssignment = {
  id: 4749,
  name: 'meh patrol',
  content: 'atop',
  points: 5586.88,
  allowedAttempts: 20666,
};

export const sampleWithFullData: IAssignment = {
  id: 1096,
  name: 'dismal',
  content: 'associate enliven',
  points: 17874.74,
  submissionType: 'ONLINE',
  allowedAttempts: 29038,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'kindheartedly in induct',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
