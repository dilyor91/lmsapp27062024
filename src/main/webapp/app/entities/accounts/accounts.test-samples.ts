import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 6618,
  username: 'from for',
  fullName: 'volleyball deeply',
  sortableName: 'poorly ruin psst',
  phone: '362.892.8925 x1087',
  gender: 'ah',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithPartialData: IAccounts = {
  id: 11426,
  username: 'but',
  fullName: 'nippy wombat',
  sortableName: 'superb',
  phone: '(237) 453-7495 x368',
  gender: 'remand',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 10131,
  username: 'dusk',
  fullName: 'psst um until',
  sortableName: 'overwork yuck amongst',
  avatarImageUrl: 'degenerate but fooey',
  phone: '439.704.7221',
  locale: 'hydrolyse',
  gender: 'truly',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithNewData: NewAccounts = {
  username: 'making penalise',
  fullName: 'yuck why',
  sortableName: 'low',
  phone: '698-945-7880 x4066',
  gender: 'approach intervention',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
