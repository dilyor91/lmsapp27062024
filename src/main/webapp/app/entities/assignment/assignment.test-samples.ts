import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 10391,
  name: 'whether aw',
};

export const sampleWithPartialData: IAssignment = {
  id: 17183,
  name: 'scope',
  points: 13396.06,
};

export const sampleWithFullData: IAssignment = {
  id: 11897,
  name: 'whoever midst speedily',
  content: 'speedily',
  points: 7011.61,
  submissionType: 'PAPER',
  allowedAttempts: 31913,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'yowza pro boo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
