import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 11,
  login: 'LO|gm@G\\HFfc6F2\\ZDj\\_HW\\h-M',
};

export const sampleWithPartialData: IUser = {
  id: 13159,
  login: 'vR',
};

export const sampleWithFullData: IUser = {
  id: 14986,
  login: 'M05nGD',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
