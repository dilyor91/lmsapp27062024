import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 30197,
  username: 'geez section',
  fullName: 'circumnavigate inexperienced lowball',
  sortableName: 'pace though meanwhile',
  phone: '597-371-4049 x878',
  gender: 'intensely',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 10576,
  username: 'bid',
  fullName: 'eek',
  sortableName: 'engender till',
  phone: '578-462-8866',
  locale: 'meanwhile grouchy',
  gender: 'very',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 31726,
  username: 'frankly',
  fullName: 'however into',
  sortableName: 'hmph why fooey',
  avatarImageUrl: 'hawk whenever superior',
  phone: '737.905.7256',
  locale: 'which',
  gender: 'gee ouch',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithNewData: NewAccounts = {
  username: 'who crackle',
  fullName: 'gnaw or',
  sortableName: 'very uh-huh',
  phone: '1-359-788-5237 x674',
  gender: 'magnificent',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
