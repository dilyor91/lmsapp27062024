package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentCourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AssignmentCourseSectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentCourseSection.class);
        AssignmentCourseSection assignmentCourseSection1 = getAssignmentCourseSectionSample1();
        AssignmentCourseSection assignmentCourseSection2 = new AssignmentCourseSection();
        assertThat(assignmentCourseSection1).isNotEqualTo(assignmentCourseSection2);

        assignmentCourseSection2.setId(assignmentCourseSection1.getId());
        assertThat(assignmentCourseSection1).isEqualTo(assignmentCourseSection2);

        assignmentCourseSection2 = getAssignmentCourseSectionSample2();
        assertThat(assignmentCourseSection1).isNotEqualTo(assignmentCourseSection2);
    }

    @Test
    void assignmentTest() {
        AssignmentCourseSection assignmentCourseSection = getAssignmentCourseSectionRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        assignmentCourseSection.setAssignment(assignmentBack);
        assertThat(assignmentCourseSection.getAssignment()).isEqualTo(assignmentBack);

        assignmentCourseSection.assignment(null);
        assertThat(assignmentCourseSection.getAssignment()).isNull();
    }

    @Test
    void courseTest() {
        AssignmentCourseSection assignmentCourseSection = getAssignmentCourseSectionRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        assignmentCourseSection.setCourse(courseBack);
        assertThat(assignmentCourseSection.getCourse()).isEqualTo(courseBack);

        assignmentCourseSection.course(null);
        assertThat(assignmentCourseSection.getCourse()).isNull();
    }

    @Test
    void courseSectionTest() {
        AssignmentCourseSection assignmentCourseSection = getAssignmentCourseSectionRandomSampleGenerator();
        CourseSection courseSectionBack = getCourseSectionRandomSampleGenerator();

        assignmentCourseSection.setCourseSection(courseSectionBack);
        assertThat(assignmentCourseSection.getCourseSection()).isEqualTo(courseSectionBack);

        assignmentCourseSection.courseSection(null);
        assertThat(assignmentCourseSection.getCourseSection()).isNull();
    }
}
