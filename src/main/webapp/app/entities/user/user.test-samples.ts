import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 21587,
  login: 'V7l!Y@1r',
};

export const sampleWithPartialData: IUser = {
  id: 496,
  login: 'IAQ94w@Nn\\Bc0\\1D4V',
};

export const sampleWithFullData: IUser = {
  id: 25807,
  login: 'SH',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
