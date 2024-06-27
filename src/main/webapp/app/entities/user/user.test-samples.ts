import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 11188,
  login: "{E?Bn@v2Nz\\!n4hO\\HXC9woN\\'ohY64b\\<4Mlov",
};

export const sampleWithPartialData: IUser = {
  id: 27492,
  login: 'I8fIk',
};

export const sampleWithFullData: IUser = {
  id: 27583,
  login: '9',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
