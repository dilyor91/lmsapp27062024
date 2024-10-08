package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseSectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseSection.class);
        CourseSection courseSection1 = getCourseSectionSample1();
        CourseSection courseSection2 = new CourseSection();
        assertThat(courseSection1).isNotEqualTo(courseSection2);

        courseSection2.setId(courseSection1.getId());
        assertThat(courseSection1).isEqualTo(courseSection2);

        courseSection2 = getCourseSectionSample2();
        assertThat(courseSection1).isNotEqualTo(courseSection2);
    }

    @Test
    void courseTest() {
        CourseSection courseSection = getCourseSectionRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        courseSection.setCourse(courseBack);
        assertThat(courseSection.getCourse()).isEqualTo(courseBack);

        courseSection.course(null);
        assertThat(courseSection.getCourse()).isNull();
    }
}
