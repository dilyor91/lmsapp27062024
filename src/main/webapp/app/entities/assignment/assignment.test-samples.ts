import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 30584,
  name: 'sarcastic',
};

export const sampleWithPartialData: IAssignment = {
  id: 27324,
  name: 'mmm zowie clerk',
  submissionType: 'ONLINE',
  allowedAttempts: 977,
};

export const sampleWithFullData: IAssignment = {
  id: 23687,
  name: 'wampum ligula to',
  content: 'alive',
  points: 27403.95,
  submissionType: 'ONLINE',
  allowedAttempts: 10025,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'hastily',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
