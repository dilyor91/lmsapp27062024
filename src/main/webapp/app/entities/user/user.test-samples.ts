import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 24408,
  login: '+f?pi@wD\\uEh\\gQohTCj',
};

export const sampleWithPartialData: IUser = {
  id: 18597,
  login: 'bExdN',
};

export const sampleWithFullData: IUser = {
  id: 12344,
  login: 'f4-WQU',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
