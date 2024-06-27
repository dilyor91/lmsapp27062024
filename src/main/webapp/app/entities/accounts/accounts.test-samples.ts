import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 26925,
  username: 'intimidate',
  fullName: 'renounce though',
  sortableName: 'cheque per',
  phone: '544.784.7282 x527',
  gender: 'package frantically an',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 32605,
  username: 'fast',
  fullName: 'lest ack',
  sortableName: 'beside manhunt upwardly',
  phone: '1-620-779-9302 x6816',
  locale: 'certainly release physically',
  gender: 'casket',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithFullData: IAccounts = {
  id: 5662,
  username: 'summit why',
  fullName: 'limit squeegee instead',
  sortableName: 'as so',
  avatarImageUrl: 'excluding pish pfft',
  phone: '(802) 331-5999 x1631',
  locale: 'yahoo buy',
  gender: 'yet defragment pish',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'phew doubtfully for',
  fullName: 'stiff',
  sortableName: 'toward jut that',
  phone: '1-721-407-4790 x452',
  gender: 'unexpectedly',
  userType: 'TEACHER',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
