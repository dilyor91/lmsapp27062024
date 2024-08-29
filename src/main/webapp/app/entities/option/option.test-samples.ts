import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 17807,
  optionText: 'circa till pomelo',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 5333,
  optionText: 'harbor',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 1526,
  optionText: 'lest boat',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'for',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
