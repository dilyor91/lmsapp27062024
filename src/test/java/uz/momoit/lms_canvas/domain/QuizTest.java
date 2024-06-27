package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Quiz.class);
        Quiz quiz1 = getQuizSample1();
        Quiz quiz2 = new Quiz();
        assertThat(quiz1).isNotEqualTo(quiz2);

        quiz2.setId(quiz1.getId());
        assertThat(quiz1).isEqualTo(quiz2);

        quiz2 = getQuizSample2();
        assertThat(quiz1).isNotEqualTo(quiz2);
    }

    @Test
    void courseTest() {
        Quiz quiz = getQuizRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        quiz.setCourse(courseBack);
        assertThat(quiz.getCourse()).isEqualTo(courseBack);

        quiz.course(null);
        assertThat(quiz.getCourse()).isNull();
    }
}
