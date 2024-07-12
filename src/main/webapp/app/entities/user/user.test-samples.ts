import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 6960,
  login: 'pB@1wV\\8MUY5',
};

export const sampleWithPartialData: IUser = {
  id: 23763,
  login: 'wuA@I84V\\c0ZvNh\\yT\\[Um1x',
};

export const sampleWithFullData: IUser = {
  id: 13363,
  login: 'awy',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
