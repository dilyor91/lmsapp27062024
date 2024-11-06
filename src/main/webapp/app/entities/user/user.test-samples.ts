import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 23981,
  login: '8P',
};

export const sampleWithPartialData: IUser = {
  id: 26315,
  login: 'Z5L',
};

export const sampleWithFullData: IUser = {
  id: 14720,
  login: 'f=@8Hu\\:fSz\\cCIyn\\%bDjI-',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
