import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 14750,
  optionText: 'hm',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 9055,
  optionText: 'violent',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 6215,
  optionText: 'vice whether up',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'recent throughout eek',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
