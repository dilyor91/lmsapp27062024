import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 21678,
  login: 'Rf7biD',
};

export const sampleWithPartialData: IUser = {
  id: 28519,
  login: 'NG',
};

export const sampleWithFullData: IUser = {
  id: 19694,
  login: 'v',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
