import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 6276,
  name: 'manatee frightfully phew',
};

export const sampleWithPartialData: IAssignment = {
  id: 4652,
  name: 'e-book apropos really',
  content: 'sternly',
  points: 20502.09,
  allowedAttempts: 16266,
  published: false,
};

export const sampleWithFullData: IAssignment = {
  id: 18430,
  name: 'misread as friction',
  content: 'hm ew',
  points: 22976.68,
  submissionType: 'PAPER',
  allowedAttempts: 6088,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'cygnet',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
