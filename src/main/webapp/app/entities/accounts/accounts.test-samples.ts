import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 12096,
  username: 'afterwards outhouse',
  fullName: 'woot dimly',
  sortableName: 'for beyond whereas',
  phone: '(366) 799-3774 x49907',
  gender: 'inside uh-huh',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 32326,
  username: 'hungrily gargantuan',
  fullName: 'hmph neatly silt',
  sortableName: 'um bacterium elegantly',
  phone: '293.248.0609',
  gender: 'phew inasmuch',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 18739,
  username: 'sympathetically',
  fullName: 'in unsteady',
  sortableName: 'gee human bold',
  avatarImageUrl: 'before',
  phone: '1-990-311-1322 x3492',
  locale: 'beach hammer store',
  gender: 'amidst',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'yahoo',
  fullName: 'truly unbearably',
  sortableName: 'fast yet',
  phone: '429.934.2701 x819',
  gender: 'qualified wretched',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
