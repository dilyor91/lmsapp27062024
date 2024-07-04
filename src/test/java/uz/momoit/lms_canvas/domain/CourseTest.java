package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseWeekInfoTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Course.class);
        Course course1 = getCourseSample1();
        Course course2 = new Course();
        assertThat(course1).isNotEqualTo(course2);

        course2.setId(course1.getId());
        assertThat(course1).isEqualTo(course2);

        course2 = getCourseSample2();
        assertThat(course1).isNotEqualTo(course2);
    }

    @Test
    void courseWeekInfoTest() {
        Course course = getCourseRandomSampleGenerator();
        CourseWeekInfo courseWeekInfoBack = getCourseWeekInfoRandomSampleGenerator();

        course.setCourseWeekInfo(courseWeekInfoBack);
        assertThat(course.getCourseWeekInfo()).isEqualTo(courseWeekInfoBack);
        assertThat(courseWeekInfoBack.getCourse()).isEqualTo(course);

        course.courseWeekInfo(null);
        assertThat(course.getCourseWeekInfo()).isNull();
        assertThat(courseWeekInfoBack.getCourse()).isNull();
    }
}
