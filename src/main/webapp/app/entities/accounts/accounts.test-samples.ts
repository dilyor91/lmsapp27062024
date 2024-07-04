import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 19101,
  username: 'since provided huzzah',
  fullName: 'calculating disobey',
  sortableName: 'mineral abaft',
  phone: '(825) 792-9846 x00558',
  gender: 'far',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithPartialData: IAccounts = {
  id: 29162,
  username: 'potentially yum polite',
  fullName: 'ew searchingly request',
  sortableName: 'diligent',
  avatarImageUrl: 'a',
  phone: '(619) 501-5156 x49000',
  gender: 'aggressive practise likewise',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 10609,
  username: 'barring woot',
  fullName: 'industrialization wind-chime',
  sortableName: 'lever abstract',
  avatarImageUrl: 'blend repulsive editorialize',
  phone: '227-221-1868 x7369',
  locale: 'comedy',
  gender: 'dreamily elaborate',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithNewData: NewAccounts = {
  username: 'swift',
  fullName: 'term watery',
  sortableName: 'apud codepage',
  phone: '1-720-774-7783 x361',
  gender: 'politely however',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
