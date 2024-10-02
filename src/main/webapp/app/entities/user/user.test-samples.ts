import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 29536,
  login: 'XuhCS',
};

export const sampleWithPartialData: IUser = {
  id: 24264,
  login: 'P',
};

export const sampleWithFullData: IUser = {
  id: 24867,
  login: 'eP',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
