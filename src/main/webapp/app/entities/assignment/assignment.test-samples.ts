import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 27820,
  name: 'likewise',
};

export const sampleWithPartialData: IAssignment = {
  id: 15115,
  name: 'people',
  content: 'spherical ha duh',
  points: 14880.49,
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 19828,
  name: 'that',
  content: 'finalise through meanwhile',
  points: 6063.76,
  submissionType: 'ONLINE',
  allowedAttempts: 29827,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'suborn',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
