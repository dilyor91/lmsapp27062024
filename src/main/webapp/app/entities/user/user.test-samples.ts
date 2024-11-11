import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 8798,
  login: 'S2-zyd',
};

export const sampleWithPartialData: IUser = {
  id: 22912,
  login: 'pew',
};

export const sampleWithFullData: IUser = {
  id: 13237,
  login: 'oC',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
