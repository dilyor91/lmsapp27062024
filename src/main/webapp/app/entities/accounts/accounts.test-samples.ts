import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 7591,
  username: 'yum anti complete',
  fullName: 'meh cicada',
  sortableName: 'geez untried yum',
  phone: '617.900.4874 x4537',
  gender: 'otter',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithPartialData: IAccounts = {
  id: 2958,
  username: 'dimly zowie likely',
  fullName: 'chaise elite anenst',
  sortableName: 'when glossy',
  phone: '(637) 651-7351 x03916',
  locale: 'gibber',
  gender: 'concerning',
  userType: 'STUDENT',
  userStatus: 'BLOCKED',
};

export const sampleWithFullData: IAccounts = {
  id: 27816,
  username: 'tall ideal',
  fullName: 'parallel',
  sortableName: 'vintage',
  avatarImageUrl: 'pace',
  phone: '1-746-607-8956 x3394',
  locale: 'once',
  gender: 'electrocute mini-skirt',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'knottily gadzooks rouse',
  fullName: 'shop gadzooks',
  sortableName: 'considering precede whoever',
  phone: '1-839-999-6654 x9431',
  gender: 'savory er manatee',
  userType: 'TEACHER',
  userStatus: 'PENDING',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
