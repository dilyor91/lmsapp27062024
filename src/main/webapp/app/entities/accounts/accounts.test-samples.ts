import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 15175,
  username: 'fast',
  fullName: 'since that transplant',
  sortableName: 'pliers coolly',
  phone: '751-249-5923 x4190',
  gender: 'consistency scuttle',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 28436,
  username: 'meh disadvantage gentle',
  fullName: 'glider uproot',
  sortableName: 'hornet',
  phone: '583.891.1353 x91905',
  gender: 'subtract whoa',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 26729,
  username: 'gosh',
  fullName: 'representation oh forgather',
  sortableName: 'though pfft howl',
  avatarImageUrl: 'duh outbid',
  phone: '1-744-820-7504 x57635',
  locale: 'uh-huh rue',
  gender: 'average',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'section incline whoa',
  fullName: 'forenenst',
  sortableName: 'iridescence over',
  phone: '(573) 400-2159 x96598',
  gender: 'because',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
