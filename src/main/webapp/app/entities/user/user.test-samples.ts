import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 18131,
  login: '_mdDi',
};

export const sampleWithPartialData: IUser = {
  id: 28388,
  login: '63',
};

export const sampleWithFullData: IUser = {
  id: 19941,
  login: 'KLw',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
