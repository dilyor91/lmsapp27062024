import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 10920,
  login: 'vO1',
};

export const sampleWithPartialData: IUser = {
  id: 27571,
  login: 'USn',
};

export const sampleWithFullData: IUser = {
  id: 1706,
  login: 'tlt.c9',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
