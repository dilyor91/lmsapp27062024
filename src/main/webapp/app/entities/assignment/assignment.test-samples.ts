import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 22821,
  name: 'gleefully unless',
};

export const sampleWithPartialData: IAssignment = {
  id: 322,
  name: 'after ick',
  content: 'pave',
};

export const sampleWithFullData: IAssignment = {
  id: 30273,
  name: 'drat',
  content: 'absent',
  points: 15537.03,
  submissionType: 'PAPER',
  allowedAttempts: 20380,
  published: false,
};

export const sampleWithNewData: NewAssignment = {
  name: 'sans augment officially',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
