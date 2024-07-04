import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 3513,
  username: 'antling',
  fullName: 'survival till for',
  sortableName: 'obnoxiously accompany winch',
  phone: '(654) 512-4884 x99008',
  gender: 'anti prattle',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithPartialData: IAccounts = {
  id: 22488,
  username: 'itchy but',
  fullName: 'since',
  sortableName: 'leverage',
  avatarImageUrl: 'competitor than',
  phone: '1-572-613-2945',
  gender: 'ew excluding upchange',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithFullData: IAccounts = {
  id: 3220,
  username: 'finally brr duh',
  fullName: 'angrily antibody immortalize',
  sortableName: 'chandelier as unless',
  avatarImageUrl: 'because aw',
  phone: '1-956-859-2561 x498',
  locale: 'defiant whoa boohoo',
  gender: 'apt',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'roughly',
  fullName: 'than',
  sortableName: 'which phew writhing',
  phone: '1-947-703-6312 x614',
  gender: 'offensively',
  userType: 'STUDENT',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
