package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AnnouncementTestSamples.*;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import java.util.HashSet;
import java.util.Set;
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

    @Test
    void announcementTest() {
        CourseSection courseSection = getCourseSectionRandomSampleGenerator();
        Announcement announcementBack = getAnnouncementRandomSampleGenerator();

        courseSection.addAnnouncement(announcementBack);
        assertThat(courseSection.getAnnouncements()).containsOnly(announcementBack);
        assertThat(announcementBack.getCourseSections()).containsOnly(courseSection);

        courseSection.removeAnnouncement(announcementBack);
        assertThat(courseSection.getAnnouncements()).doesNotContain(announcementBack);
        assertThat(announcementBack.getCourseSections()).doesNotContain(courseSection);

        courseSection.announcements(new HashSet<>(Set.of(announcementBack)));
        assertThat(courseSection.getAnnouncements()).containsOnly(announcementBack);
        assertThat(announcementBack.getCourseSections()).containsOnly(courseSection);

        courseSection.setAnnouncements(new HashSet<>());
        assertThat(courseSection.getAnnouncements()).doesNotContain(announcementBack);
        assertThat(announcementBack.getCourseSections()).doesNotContain(courseSection);
    }

    @Test
    void assignmentTest() {
        CourseSection courseSection = getCourseSectionRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        courseSection.addAssignment(assignmentBack);
        assertThat(courseSection.getAssignments()).containsOnly(assignmentBack);
        assertThat(assignmentBack.getCourseSections()).containsOnly(courseSection);

        courseSection.removeAssignment(assignmentBack);
        assertThat(courseSection.getAssignments()).doesNotContain(assignmentBack);
        assertThat(assignmentBack.getCourseSections()).doesNotContain(courseSection);

        courseSection.assignments(new HashSet<>(Set.of(assignmentBack)));
        assertThat(courseSection.getAssignments()).containsOnly(assignmentBack);
        assertThat(assignmentBack.getCourseSections()).containsOnly(courseSection);

        courseSection.setAssignments(new HashSet<>());
        assertThat(courseSection.getAssignments()).doesNotContain(assignmentBack);
        assertThat(assignmentBack.getCourseSections()).doesNotContain(courseSection);
    }
}
