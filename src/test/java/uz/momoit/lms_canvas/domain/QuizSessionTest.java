package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.QuizSessionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizSessionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizSession.class);
        QuizSession quizSession1 = getQuizSessionSample1();
        QuizSession quizSession2 = new QuizSession();
        assertThat(quizSession1).isNotEqualTo(quizSession2);

        quizSession2.setId(quizSession1.getId());
        assertThat(quizSession1).isEqualTo(quizSession2);

        quizSession2 = getQuizSessionSample2();
        assertThat(quizSession1).isNotEqualTo(quizSession2);
    }

    @Test
    void studentTest() {
        QuizSession quizSession = getQuizSessionRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        quizSession.setStudent(studentBack);
        assertThat(quizSession.getStudent()).isEqualTo(studentBack);

        quizSession.student(null);
        assertThat(quizSession.getStudent()).isNull();
    }

    @Test
    void quizTest() {
        QuizSession quizSession = getQuizSessionRandomSampleGenerator();
        Quiz quizBack = getQuizRandomSampleGenerator();

        quizSession.setQuiz(quizBack);
        assertThat(quizSession.getQuiz()).isEqualTo(quizBack);

        quizSession.quiz(null);
        assertThat(quizSession.getQuiz()).isNull();
    }
}
