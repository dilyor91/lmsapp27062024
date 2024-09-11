import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 28730,
  login: 'QM@e7',
};

export const sampleWithPartialData: IUser = {
  id: 16102,
  login: 'SA',
};

export const sampleWithFullData: IUser = {
  id: 8125,
  login: 'Dni@DnN\\$G\\7lSVpMp\\$i',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
