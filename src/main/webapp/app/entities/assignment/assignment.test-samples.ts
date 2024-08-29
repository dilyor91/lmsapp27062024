import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 18482,
  name: 'healthily rigidly complicated',
};

export const sampleWithPartialData: IAssignment = {
  id: 29561,
  name: 'offensively underwear an',
  points: 17676.32,
  submissionType: 'PAPER',
};

export const sampleWithFullData: IAssignment = {
  id: 8147,
  name: 'nutty pfft pike',
  content: 'defuse for bruit',
  points: 6826.94,
  submissionType: 'PAPER',
  allowedAttempts: 22556,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'shame equatorial',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
