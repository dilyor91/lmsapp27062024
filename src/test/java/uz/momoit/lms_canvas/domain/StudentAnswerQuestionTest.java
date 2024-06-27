package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.OptionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuestionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizSessionTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentAnswerQuestionTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentAnswerQuestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAnswerQuestion.class);
        StudentAnswerQuestion studentAnswerQuestion1 = getStudentAnswerQuestionSample1();
        StudentAnswerQuestion studentAnswerQuestion2 = new StudentAnswerQuestion();
        assertThat(studentAnswerQuestion1).isNotEqualTo(studentAnswerQuestion2);

        studentAnswerQuestion2.setId(studentAnswerQuestion1.getId());
        assertThat(studentAnswerQuestion1).isEqualTo(studentAnswerQuestion2);

        studentAnswerQuestion2 = getStudentAnswerQuestionSample2();
        assertThat(studentAnswerQuestion1).isNotEqualTo(studentAnswerQuestion2);
    }

    @Test
    void questionTest() {
        StudentAnswerQuestion studentAnswerQuestion = getStudentAnswerQuestionRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        studentAnswerQuestion.setQuestion(questionBack);
        assertThat(studentAnswerQuestion.getQuestion()).isEqualTo(questionBack);

        studentAnswerQuestion.question(null);
        assertThat(studentAnswerQuestion.getQuestion()).isNull();
    }

    @Test
    void optionTest() {
        StudentAnswerQuestion studentAnswerQuestion = getStudentAnswerQuestionRandomSampleGenerator();
        Option optionBack = getOptionRandomSampleGenerator();

        studentAnswerQuestion.setOption(optionBack);
        assertThat(studentAnswerQuestion.getOption()).isEqualTo(optionBack);

        studentAnswerQuestion.option(null);
        assertThat(studentAnswerQuestion.getOption()).isNull();
    }

    @Test
    void quizSessionTest() {
        StudentAnswerQuestion studentAnswerQuestion = getStudentAnswerQuestionRandomSampleGenerator();
        QuizSession quizSessionBack = getQuizSessionRandomSampleGenerator();

        studentAnswerQuestion.setQuizSession(quizSessionBack);
        assertThat(studentAnswerQuestion.getQuizSession()).isEqualTo(quizSessionBack);

        studentAnswerQuestion.quizSession(null);
        assertThat(studentAnswerQuestion.getQuizSession()).isNull();
    }
}
