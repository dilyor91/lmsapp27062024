import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 975,
  login: 't',
};

export const sampleWithPartialData: IUser = {
  id: 8128,
  login: 'U*!1IH@bY928B\\xLliLi\\(iVGT\\ygFd\\fecj',
};

export const sampleWithFullData: IUser = {
  id: 2677,
  login: '@keeF',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
