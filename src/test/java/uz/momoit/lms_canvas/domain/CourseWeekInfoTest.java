package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseWeekInfoTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseWeekInfoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseWeekInfo.class);
        CourseWeekInfo courseWeekInfo1 = getCourseWeekInfoSample1();
        CourseWeekInfo courseWeekInfo2 = new CourseWeekInfo();
        assertThat(courseWeekInfo1).isNotEqualTo(courseWeekInfo2);

        courseWeekInfo2.setId(courseWeekInfo1.getId());
        assertThat(courseWeekInfo1).isEqualTo(courseWeekInfo2);

        courseWeekInfo2 = getCourseWeekInfoSample2();
        assertThat(courseWeekInfo1).isNotEqualTo(courseWeekInfo2);
    }

    @Test
    void courseTest() {
        CourseWeekInfo courseWeekInfo = getCourseWeekInfoRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        courseWeekInfo.setCourse(courseBack);
        assertThat(courseWeekInfo.getCourse()).isEqualTo(courseBack);

        courseWeekInfo.course(null);
        assertThat(courseWeekInfo.getCourse()).isNull();
    }
}
