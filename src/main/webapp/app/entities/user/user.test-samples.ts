import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 19295,
  login: 'MR',
};

export const sampleWithPartialData: IUser = {
  id: 22937,
  login: '0dhw.',
};

export const sampleWithFullData: IUser = {
  id: 18773,
  login: 'Z^H@Cvtk\\drccc',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
