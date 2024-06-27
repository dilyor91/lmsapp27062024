package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.LessonTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class LessonTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lesson.class);
        Lesson lesson1 = getLessonSample1();
        Lesson lesson2 = new Lesson();
        assertThat(lesson1).isNotEqualTo(lesson2);

        lesson2.setId(lesson1.getId());
        assertThat(lesson1).isEqualTo(lesson2);

        lesson2 = getLessonSample2();
        assertThat(lesson1).isNotEqualTo(lesson2);
    }

    @Test
    void courseTest() {
        Lesson lesson = getLessonRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        lesson.setCourse(courseBack);
        assertThat(lesson.getCourse()).isEqualTo(courseBack);

        lesson.course(null);
        assertThat(lesson.getCourse()).isNull();
    }
}
