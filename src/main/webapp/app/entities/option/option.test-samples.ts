import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 20744,
  optionText: 'remark greatly',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 2992,
  optionText: 'disinherit fully lawful',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 8653,
  optionText: 'grouchy mechanically',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'accidentally yum drat',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
