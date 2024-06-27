package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizCourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class QuizCourseSectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizCourseSection.class);
        QuizCourseSection quizCourseSection1 = getQuizCourseSectionSample1();
        QuizCourseSection quizCourseSection2 = new QuizCourseSection();
        assertThat(quizCourseSection1).isNotEqualTo(quizCourseSection2);

        quizCourseSection2.setId(quizCourseSection1.getId());
        assertThat(quizCourseSection1).isEqualTo(quizCourseSection2);

        quizCourseSection2 = getQuizCourseSectionSample2();
        assertThat(quizCourseSection1).isNotEqualTo(quizCourseSection2);
    }

    @Test
    void courseTest() {
        QuizCourseSection quizCourseSection = getQuizCourseSectionRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        quizCourseSection.setCourse(courseBack);
        assertThat(quizCourseSection.getCourse()).isEqualTo(courseBack);

        quizCourseSection.course(null);
        assertThat(quizCourseSection.getCourse()).isNull();
    }

    @Test
    void courseSectionTest() {
        QuizCourseSection quizCourseSection = getQuizCourseSectionRandomSampleGenerator();
        CourseSection courseSectionBack = getCourseSectionRandomSampleGenerator();

        quizCourseSection.setCourseSection(courseSectionBack);
        assertThat(quizCourseSection.getCourseSection()).isEqualTo(courseSectionBack);

        quizCourseSection.courseSection(null);
        assertThat(quizCourseSection.getCourseSection()).isNull();
    }

    @Test
    void quizTest() {
        QuizCourseSection quizCourseSection = getQuizCourseSectionRandomSampleGenerator();
        Quiz quizBack = getQuizRandomSampleGenerator();

        quizCourseSection.setQuiz(quizBack);
        assertThat(quizCourseSection.getQuiz()).isEqualTo(quizBack);

        quizCourseSection.quiz(null);
        assertThat(quizCourseSection.getQuiz()).isNull();
    }
}
