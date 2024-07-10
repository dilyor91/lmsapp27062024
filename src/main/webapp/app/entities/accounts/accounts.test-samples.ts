import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 6423,
  username: 'courage who',
  fullName: 'meanwhile phew tire',
  sortableName: 'phooey where vastly',
  phone: '950.541.2567 x87786',
  gender: 'modulo ha drat',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 32625,
  username: 'tussle youthfully key',
  fullName: 'mesmerize',
  sortableName: 'remorseful alienated',
  phone: '577-623-7180 x7841',
  locale: 'boohoo',
  gender: 'giggle correspond astonishing',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithFullData: IAccounts = {
  id: 2087,
  username: 'ha worried oil',
  fullName: 'or worthwhile',
  sortableName: 'divine anxiously opposite',
  avatarImageUrl: 'courageous buttress next',
  phone: '667-737-4303 x59553',
  locale: 'underneath countermand seriously',
  gender: 'biodegradable who provided',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'as unless',
  fullName: 'wisely so blank',
  sortableName: 'unless highly',
  phone: '783-316-2713',
  gender: 'aside',
  userType: 'TEACHER',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
