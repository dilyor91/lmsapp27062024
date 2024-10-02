import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 13846,
  username: 'hence',
  fullName: 'loudly deceivingly',
  sortableName: 'um',
  phone: '512-424-8662',
  gender: 'circumference duh',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 9534,
  username: 'zowie briefly everlasting',
  fullName: 'ouch stratify',
  sortableName: 'pfft unto',
  phone: '481.956.0218 x63185',
  locale: 'before',
  gender: 'inasmuch impure thoroughly',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 25870,
  username: 'serialize crossly dreamily',
  fullName: 'reporter',
  sortableName: 'elegantly bah',
  avatarImageUrl: 'pish solidly duh',
  phone: '805.494.4101 x2591',
  locale: 'shanghai',
  gender: 'congregate ouch junior',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'yum jiggle',
  fullName: 'pricey alert',
  sortableName: 'offset kaleidoscopic',
  phone: '1-604-296-2920 x59916',
  gender: 'supposing revitalise zowie',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
