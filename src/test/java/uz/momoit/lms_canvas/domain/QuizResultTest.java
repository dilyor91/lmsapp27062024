package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.QuizResultTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizSessionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizResultTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizResult.class);
        QuizResult quizResult1 = getQuizResultSample1();
        QuizResult quizResult2 = new QuizResult();
        assertThat(quizResult1).isNotEqualTo(quizResult2);

        quizResult2.setId(quizResult1.getId());
        assertThat(quizResult1).isEqualTo(quizResult2);

        quizResult2 = getQuizResultSample2();
        assertThat(quizResult1).isNotEqualTo(quizResult2);
    }

    @Test
    void quizTest() {
        QuizResult quizResult = getQuizResultRandomSampleGenerator();
        Quiz quizBack = getQuizRandomSampleGenerator();

        quizResult.setQuiz(quizBack);
        assertThat(quizResult.getQuiz()).isEqualTo(quizBack);

        quizResult.quiz(null);
        assertThat(quizResult.getQuiz()).isNull();
    }

    @Test
    void studentTest() {
        QuizResult quizResult = getQuizResultRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        quizResult.setStudent(studentBack);
        assertThat(quizResult.getStudent()).isEqualTo(studentBack);

        quizResult.student(null);
        assertThat(quizResult.getStudent()).isNull();
    }

    @Test
    void quizSessionTest() {
        QuizResult quizResult = getQuizResultRandomSampleGenerator();
        QuizSession quizSessionBack = getQuizSessionRandomSampleGenerator();

        quizResult.setQuizSession(quizSessionBack);
        assertThat(quizResult.getQuizSession()).isEqualTo(quizSessionBack);

        quizResult.quizSession(null);
        assertThat(quizResult.getQuizSession()).isNull();
    }
}
