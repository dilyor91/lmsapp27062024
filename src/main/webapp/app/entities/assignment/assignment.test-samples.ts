import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 19865,
  name: 'hospitalize whether',
};

export const sampleWithPartialData: IAssignment = {
  id: 6375,
  name: 'loosely so commonly',
  content: 'gah',
  allowedAttempts: 3921,
};

export const sampleWithFullData: IAssignment = {
  id: 26696,
  name: 'test gosh',
  content: 'sweetly oddly',
  points: 17748.37,
  submissionType: 'ONLINE',
  allowedAttempts: 3757,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'loudly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
