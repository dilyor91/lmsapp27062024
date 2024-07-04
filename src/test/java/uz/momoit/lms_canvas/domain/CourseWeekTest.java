package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseWeekTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseWeekTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseWeek.class);
        CourseWeek courseWeek1 = getCourseWeekSample1();
        CourseWeek courseWeek2 = new CourseWeek();
        assertThat(courseWeek1).isNotEqualTo(courseWeek2);

        courseWeek2.setId(courseWeek1.getId());
        assertThat(courseWeek1).isEqualTo(courseWeek2);

        courseWeek2 = getCourseWeekSample2();
        assertThat(courseWeek1).isNotEqualTo(courseWeek2);
    }

    @Test
    void courseTest() {
        CourseWeek courseWeek = getCourseWeekRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        courseWeek.setCourse(courseBack);
        assertThat(courseWeek.getCourse()).isEqualTo(courseBack);

        courseWeek.course(null);
        assertThat(courseWeek.getCourse()).isNull();
    }
}
