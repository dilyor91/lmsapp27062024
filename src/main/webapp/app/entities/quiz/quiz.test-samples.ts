import { IQuiz, NewQuiz } from './quiz.model';

export const sampleWithRequiredData: IQuiz = {
  id: 29339,
  quizName: 'midst',
  timeInMinute: 30306,
};

export const sampleWithPartialData: IQuiz = {
  id: 14749,
  quizName: 'hummus interestingly aw',
  timeInMinute: 15205,
};

export const sampleWithFullData: IQuiz = {
  id: 27067,
  quizName: 'sock generally via',
  timeInMinute: 12080,
  published: false,
};

export const sampleWithNewData: NewQuiz = {
  quizName: 'armour pardon',
  timeInMinute: 26146,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
