import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 13953,
  name: 'concerning jell',
};

export const sampleWithPartialData: IAssignment = {
  id: 3449,
  name: 'utterly scrabble windy',
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 12609,
  name: 'from',
  content: 'pleasing whoa',
  points: 11050.05,
  submissionType: 'ONLINE',
  allowedAttempts: 26375,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'among',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
