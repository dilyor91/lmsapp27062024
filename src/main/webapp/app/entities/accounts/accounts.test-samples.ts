import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 17961,
  username: 'until yum',
  fullName: 'big',
  sortableName: 'till sternly overconfidently',
  phone: '(441) 851-5982 x1819',
  gender: 'carefully ick',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 27706,
  username: 'huzzah sans forebear',
  fullName: 'oh repeatedly',
  sortableName: 'unless',
  phone: '(992) 647-9168 x207',
  gender: 'meanwhile',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithFullData: IAccounts = {
  id: 23209,
  username: 'muddy',
  fullName: 'runny up',
  sortableName: 'oh after belt',
  avatarImageUrl: 'provided afore',
  phone: '(510) 368-8724',
  locale: 'patrol',
  gender: 'certainly',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'yowza huzzah',
  fullName: 'validate',
  sortableName: 'including because',
  phone: '1-726-848-4084 x338',
  gender: 'with although smooch',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
