import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 4129,
  optionText: 'woot per what',
  isCorrect: false,
};

export const sampleWithPartialData: IOption = {
  id: 2312,
  optionText: 'before sand meh',
  isCorrect: true,
};

export const sampleWithFullData: IOption = {
  id: 16239,
  optionText: 'left continually',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'questioningly along',
  isCorrect: false,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
