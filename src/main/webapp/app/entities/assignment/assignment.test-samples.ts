import { IAssignment, NewAssignment } from './assignment.model';

export const sampleWithRequiredData: IAssignment = {
  id: 30994,
  name: 'into oof',
};

export const sampleWithPartialData: IAssignment = {
  id: 5788,
  name: 'fooey recite poorly',
  content: 'obnoxiously catastrophe supposing',
  points: 20362.41,
  submissionType: 'ONLINE',
  published: true,
};

export const sampleWithFullData: IAssignment = {
  id: 27482,
  name: 'puzzled overheat',
  content: 'baste',
  points: 19978.76,
  submissionType: 'ONLINE',
  allowedAttempts: 9963,
  published: true,
};

export const sampleWithNewData: NewAssignment = {
  name: 'aside monocle annual',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
