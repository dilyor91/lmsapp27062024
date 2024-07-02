import { IOption, NewOption } from './option.model';

export const sampleWithRequiredData: IOption = {
  id: 30105,
  optionText: 'warmly serenade',
  isCorrect: true,
};

export const sampleWithPartialData: IOption = {
  id: 5349,
  optionText: 'housework',
  isCorrect: false,
};

export const sampleWithFullData: IOption = {
  id: 30903,
  optionText: 'will jubilantly duff',
  isCorrect: false,
};

export const sampleWithNewData: NewOption = {
  optionText: 'hovercraft',
  isCorrect: true,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
