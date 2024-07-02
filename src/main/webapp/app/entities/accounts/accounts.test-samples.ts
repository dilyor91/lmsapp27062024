import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 30412,
  username: 'ew ack',
  fullName: 'oh towards mumble',
  sortableName: 'atrophy',
  phone: '243.439.2649 x9097',
  gender: 'prevaricate',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 29412,
  username: 'boo splendor when',
  fullName: 'lounge inasmuch impound',
  sortableName: 'that victorious',
  avatarImageUrl: 'mysterious',
  phone: '750.660.4676 x9287',
  gender: 'consequently',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithFullData: IAccounts = {
  id: 14752,
  username: 'dugout',
  fullName: 'since meanwhile',
  sortableName: 'anenst',
  avatarImageUrl: 'chasten monopolise but',
  phone: '1-663-828-5472',
  locale: 'self-reliant',
  gender: 'joyously fantastic',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithNewData: NewAccounts = {
  username: 'mmm lovely onto',
  fullName: 'failing although gleefully',
  sortableName: 'viewer',
  phone: '1-631-812-5834 x3690',
  gender: 'heave hybridization crew',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
