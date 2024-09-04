import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 9640,
  optionText: 'drat',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 5099,
  optionText: 'grandiose',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 7680,
  optionText: 'red zowie awesome',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'blah mid geez',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
