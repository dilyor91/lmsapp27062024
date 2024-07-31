import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 13839,
  optionText: 'essential wise ah',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 14654,
  optionText: 'fatal tab',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 19616,
  optionText: 'positively',
  isCorrect: true,
};

export const sampleWithNewData: NewOption = {
  optionText: 'harm',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
