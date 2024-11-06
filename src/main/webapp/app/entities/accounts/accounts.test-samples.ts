import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 30653,
  username: 'underneath considering word',
  fullName: 'loose and',
  sortableName: 'promptly supposing dividend',
  phone: '1-989-478-1525 x7347',
  gender: 'when earth assail',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 4839,
  username: 'sensitize oof oh',
  fullName: 'solace gleefully',
  sortableName: 'throughout',
  avatarImageUrl: 'simplistic tarragon service',
  phone: '361.981.0221 x2335',
  gender: 'grizzled phew badly',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithFullData: IAccounts = {
  id: 18589,
  username: 'cap ugh',
  fullName: 'scented',
  sortableName: 'deafening since hm',
  avatarImageUrl: 'clinch handy',
  phone: '740.748.8403 x820',
  locale: 'times duster rim',
  gender: 'where',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'extremely swing',
  fullName: 'well-made',
  sortableName: 'elevator until huzzah',
  phone: '1-453-248-2223',
  gender: 'knickers till',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
