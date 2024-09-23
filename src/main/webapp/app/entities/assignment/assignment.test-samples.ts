import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 24892,
  name: 'congregate kissingly',
};

export const sampleWithPartialData: IAssignment = {
  id: 1375,
  name: 'wide',
  content: 'meh deceivingly',
  allowedAttempts: 23730,
  published: false,
};

export const sampleWithFullData: IAssignment = {
  id: 24091,
  name: 'courageous faithfully outrun',
  content: 'meanwhile pfft liquid',
  points: 14551.71,
  submissionType: 'PAPER',
  allowedAttempts: 21886,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'generally uh-huh',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
