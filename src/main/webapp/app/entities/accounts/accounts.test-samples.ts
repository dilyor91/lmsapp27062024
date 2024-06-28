import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 4959,
  username: 'despite',
  fullName: 'fooey',
  sortableName: 'absolute',
  phone: '526-206-7635 x05446',
  gender: 'as',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithPartialData: IAccounts = {
  id: 32548,
  username: 'hmph broadcast',
  fullName: 'if footstool',
  sortableName: 'pharmacopoeia white',
  phone: '574.383.1252 x6797',
  locale: 'sharply versus',
  gender: 'which once mmm',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 21684,
  username: 'playfully barring',
  fullName: 'though',
  sortableName: 'anxious to incidentally',
  avatarImageUrl: 'under',
  phone: '927.279.7794 x47752',
  locale: 'tedious suspiciously madly',
  gender: 'gee oof wait',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'evil however',
  fullName: 'hence writhing',
  sortableName: 'ack yippee',
  phone: '(658) 997-6000',
  gender: 'hug circa cautiously',
  userType: 'TEACHER',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
