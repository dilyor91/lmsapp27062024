import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 27433,
  optionText: 'for',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 32218,
  optionText: 'busily',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 19467,
  optionText: 'gadzooks',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'and anenst',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
