package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.QuestionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizSessionTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentQuestionTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentQuestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentQuestion.class);
        StudentQuestion studentQuestion1 = getStudentQuestionSample1();
        StudentQuestion studentQuestion2 = new StudentQuestion();
        assertThat(studentQuestion1).isNotEqualTo(studentQuestion2);

        studentQuestion2.setId(studentQuestion1.getId());
        assertThat(studentQuestion1).isEqualTo(studentQuestion2);

        studentQuestion2 = getStudentQuestionSample2();
        assertThat(studentQuestion1).isNotEqualTo(studentQuestion2);
    }

    @Test
    void quizSessionTest() {
        StudentQuestion studentQuestion = getStudentQuestionRandomSampleGenerator();
        QuizSession quizSessionBack = getQuizSessionRandomSampleGenerator();

        studentQuestion.setQuizSession(quizSessionBack);
        assertThat(studentQuestion.getQuizSession()).isEqualTo(quizSessionBack);

        studentQuestion.quizSession(null);
        assertThat(studentQuestion.getQuizSession()).isNull();
    }

    @Test
    void questionTest() {
        StudentQuestion studentQuestion = getStudentQuestionRandomSampleGenerator();
        Question questionBack = getQuestionRandomSampleGenerator();

        studentQuestion.setQuestion(questionBack);
        assertThat(studentQuestion.getQuestion()).isEqualTo(questionBack);

        studentQuestion.question(null);
        assertThat(studentQuestion.getQuestion()).isNull();
    }
}
