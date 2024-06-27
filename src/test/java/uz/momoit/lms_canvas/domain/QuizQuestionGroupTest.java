package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.QuestionGroupTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizQuestionGroupTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizQuestionGroupTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizQuestionGroup.class);
        QuizQuestionGroup quizQuestionGroup1 = getQuizQuestionGroupSample1();
        QuizQuestionGroup quizQuestionGroup2 = new QuizQuestionGroup();
        assertThat(quizQuestionGroup1).isNotEqualTo(quizQuestionGroup2);

        quizQuestionGroup2.setId(quizQuestionGroup1.getId());
        assertThat(quizQuestionGroup1).isEqualTo(quizQuestionGroup2);

        quizQuestionGroup2 = getQuizQuestionGroupSample2();
        assertThat(quizQuestionGroup1).isNotEqualTo(quizQuestionGroup2);
    }

    @Test
    void quizTest() {
        QuizQuestionGroup quizQuestionGroup = getQuizQuestionGroupRandomSampleGenerator();
        Quiz quizBack = getQuizRandomSampleGenerator();

        quizQuestionGroup.setQuiz(quizBack);
        assertThat(quizQuestionGroup.getQuiz()).isEqualTo(quizBack);

        quizQuestionGroup.quiz(null);
        assertThat(quizQuestionGroup.getQuiz()).isNull();
    }

    @Test
    void questionGroupTest() {
        QuizQuestionGroup quizQuestionGroup = getQuizQuestionGroupRandomSampleGenerator();
        QuestionGroup questionGroupBack = getQuestionGroupRandomSampleGenerator();

        quizQuestionGroup.setQuestionGroup(questionGroupBack);
        assertThat(quizQuestionGroup.getQuestionGroup()).isEqualTo(questionGroupBack);

        quizQuestionGroup.questionGroup(null);
        assertThat(quizQuestionGroup.getQuestionGroup()).isNull();
    }
}
