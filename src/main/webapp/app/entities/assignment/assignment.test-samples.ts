import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 28764,
  name: 'whoa like weakly',
};

export const sampleWithPartialData: IAssignment = {
  id: 30690,
  name: 'straw',
  submissionType: 'PAPER',
  published: false,
};

export const sampleWithFullData: IAssignment = {
  id: 16126,
  name: 'jaywalk advanced',
  content: 'triangular unless slowly',
  points: 19656.31,
  submissionType: 'ONLINE',
  allowedAttempts: 23287,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'carnival',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
