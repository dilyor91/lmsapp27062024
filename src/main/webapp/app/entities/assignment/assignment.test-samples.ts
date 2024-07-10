import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 23556,
  name: 'pale amidst diphthongise',
};

export const sampleWithPartialData: IAssignment = {
  id: 6512,
  name: 'cup',
  content: 'debris esteem versus',
  points: 17087.83,
  allowedAttempts: 24911,
};

export const sampleWithFullData: IAssignment = {
  id: 29133,
  name: 'beyond yieldingly',
  content: 'diam openly cart',
  points: 7701.5,
  submissionType: 'ONLINE',
  allowedAttempts: 22150,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'unless',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
