package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AssignmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Assignment.class);
        Assignment assignment1 = getAssignmentSample1();
        Assignment assignment2 = new Assignment();
        assertThat(assignment1).isNotEqualTo(assignment2);

        assignment2.setId(assignment1.getId());
        assertThat(assignment1).isEqualTo(assignment2);

        assignment2 = getAssignmentSample2();
        assertThat(assignment1).isNotEqualTo(assignment2);
    }

    @Test
    void courseTest() {
        Assignment assignment = getAssignmentRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        assignment.setCourse(courseBack);
        assertThat(assignment.getCourse()).isEqualTo(courseBack);

        assignment.course(null);
        assertThat(assignment.getCourse()).isNull();
    }

    @Test
    void courseSectionTest() {
        Assignment assignment = getAssignmentRandomSampleGenerator();
        CourseSection courseSectionBack = getCourseSectionRandomSampleGenerator();

        assignment.addCourseSection(courseSectionBack);
        assertThat(assignment.getCourseSections()).containsOnly(courseSectionBack);

        assignment.removeCourseSection(courseSectionBack);
        assertThat(assignment.getCourseSections()).doesNotContain(courseSectionBack);

        assignment.courseSections(new HashSet<>(Set.of(courseSectionBack)));
        assertThat(assignment.getCourseSections()).containsOnly(courseSectionBack);

        assignment.setCourseSections(new HashSet<>());
        assertThat(assignment.getCourseSections()).doesNotContain(courseSectionBack);
    }
}
