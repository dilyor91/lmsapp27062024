import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 24411,
  username: 'torn',
  fullName: 'bug',
  sortableName: 'legging whole hmph',
  phone: '1-711-672-9462 x71400',
  gender: 'daintily',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 2834,
  username: 'plumber gee',
  fullName: 'defiantly equal editor',
  sortableName: 'instance solvency',
  avatarImageUrl: 'meh',
  phone: '483.226.2031 x24176',
  locale: 'license litter meaningfully',
  gender: 'eek',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 2954,
  username: 'around restfully tragic',
  fullName: 'instead er develop',
  sortableName: 'than upward',
  avatarImageUrl: 'within boo easily',
  phone: '(570) 702-0165',
  locale: 'leading',
  gender: 'provided structure energetically',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithNewData: NewAccounts = {
  username: 'colligate boo',
  fullName: 'irritably',
  sortableName: 'save under dim',
  phone: '(240) 348-6017 x226',
  gender: 'following intermesh worth',
  userType: 'STUDENT',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
