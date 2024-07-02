import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 29894,
  login: '@6Cj',
};

export const sampleWithPartialData: IUser = {
  id: 28772,
  login: 'w|rQt@kb08C\\>mX\\#J5a4q\\6UG43w\\"yO8',
};

export const sampleWithFullData: IUser = {
  id: 31079,
  login: 'GhDhOB',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
