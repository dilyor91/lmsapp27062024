import { IAccounts, NewAccounts } from './accounts.model';

export const sampleWithRequiredData: IAccounts = {
  id: 14364,
  username: 'long',
  fullName: 'blossom amused',
  sortableName: 'fresh furthermore',
  phone: '1-275-498-6367 x0935',
  gender: 'afore assistance',
  userType: 'STUDENT',
  userStatus: 'PENDING',
};

export const sampleWithPartialData: IAccounts = {
  id: 8710,
  username: 'yourself',
  fullName: 'notation',
  sortableName: 'valiantly even',
  phone: '1-669-433-0277 x693',
  gender: 'instead',
  userType: 'STUDENT',
  userStatus: 'ACTIVE',
};

export const sampleWithFullData: IAccounts = {
  id: 3963,
  username: 'choosing',
  fullName: 'composed',
  sortableName: 'although',
  avatarImageUrl: 'for yet glue',
  phone: '853-518-5703',
  locale: 'hmph hmph',
  gender: 'over leer',
  userType: 'TEACHER',
  userStatus: 'PENDING',
};

export const sampleWithNewData: NewAccounts = {
  username: 'modulo ick',
  fullName: 'equality whoever so',
  sortableName: 'unique who how',
  phone: '546-631-8844',
  gender: 'afore peel belfry',
  userType: 'TEACHER',
  userStatus: 'BLOCKED',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
