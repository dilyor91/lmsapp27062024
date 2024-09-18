import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 20651,
  username: 'revascularization or qua',
  fullName: 'dissent gurn jubilantly',
  sortableName: 'rightfully duh past',
  phone: '201-958-8640',
  gender: 'fooey for atop',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 7525,
  username: 'strictly quick fooey',
  fullName: 'intensely honestly sad',
  sortableName: 'whether',
  phone: '928-386-5700 x84952',
  gender: 'when acidly what',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 26095,
  username: 'save pirate',
  fullName: 'highly out grab-bag',
  sortableName: 'yelp',
  avatarImageUrl: 'handsaw unpleasant vacantly',
  phone: '1-218-210-2177 x6865',
  locale: 'wholly distorted',
  gender: 'slowly glimpse',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithNewData: NewAccounts = {
  username: 'klutzy furthermore',
  fullName: 'allocate revalue sympathetically',
  sortableName: 'terribly woefully oatmeal',
  phone: '934-657-2457 x8858',
  gender: 'lovingly whenever',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
