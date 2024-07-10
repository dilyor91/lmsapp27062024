import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 4763,
  optionText: 'prophet',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 11642,
  optionText: 'until eye',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 7273,
  optionText: 'haunting oblong',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'astride',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
