import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 11375,
  optionText: 'owlishly',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 11389,
  optionText: 'since',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 28901,
  optionText: 'meadow opposite banish',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'doubtfully',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
