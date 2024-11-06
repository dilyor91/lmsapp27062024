import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 19347,
  name: 'intensely crafty',
};

export const sampleWithPartialData: IAssignment = {
  id: 27883,
  name: 'unaccountably instantly huddle',
  points: 10332.8,
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 20709,
  name: 'kookily gadzooks because',
  content: 'annually clearly ruin',
  points: 7.57,
  submissionType: 'PAPER',
  allowedAttempts: 22338,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'alarmed',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
