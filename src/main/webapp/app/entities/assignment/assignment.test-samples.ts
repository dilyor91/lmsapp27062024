import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 24414,
  name: 'truthfully following',
};

export const sampleWithPartialData: IAssignment = {
  id: 1761,
  name: 'balance killer gelding',
  points: 15492.45,
};

export const sampleWithFullData: IAssignment = {
  id: 3470,
  name: 'dimpled overact student',
  content: 'qua spiteful despite',
  points: 15037.61,
  submissionType: 'ONLINE',
  allowedAttempts: 17384,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'tightly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
