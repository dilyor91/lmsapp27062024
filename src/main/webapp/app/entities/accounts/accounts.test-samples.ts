import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 10426,
  username: 'meh calf indeed',
  fullName: 'fooey lest gracefully',
  sortableName: 'yahoo',
  phone: '1-941-278-7237',
  gender: 'failing',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 19821,
  username: 'taste harass',
  fullName: 'whoever',
  sortableName: 'launder abrogation after',
  avatarImageUrl: 'cherry reassuringly',
  phone: '(793) 401-1701 x4102',
  gender: 'ground',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 584,
  username: 'juxtapose er',
  fullName: 'implement',
  sortableName: 'bud radar',
  avatarImageUrl: 'adventurously',
  phone: '234-998-1957 x9253',
  locale: 'for eek while',
  gender: 'textual afterwards aside',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'branch zowie save',
  fullName: 'physical doctorate recklessly',
  sortableName: 'aboard vice but',
  phone: '1-541-563-8715 x8090',
  gender: 'when interview rewarding',
  userType: 'TEACHER',
  userStatus: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
