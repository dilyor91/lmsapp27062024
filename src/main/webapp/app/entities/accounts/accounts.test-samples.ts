import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 5050,
  username: 'syrup',
  fullName: 'on provided',
  sortableName: 'prosecute zowie soul',
  phone: '930-454-3127 x176',
  gender: 'feint',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 3740,
  username: 'cathedral spectacles',
  fullName: 'composed',
  sortableName: 'original engineer gasket',
  phone: '1-648-584-0606 x50141',
  gender: 'drat',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithFullData: IAccounts = {
  id: 3612,
  username: 'wannabe slip wildly',
  fullName: 'station unnecessarily',
  sortableName: 'large unibody',
  avatarImageUrl: 'into carefully',
  phone: '737.365.8037 x8392',
  locale: 'pheromone unveil at',
  gender: 'physically gee',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'stump yippee although',
  fullName: 'soggy unbearably aw',
  sortableName: 'periodic',
  phone: '(861) 805-7138',
  gender: 'politely roughly lovable',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
