package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AnnouncementCourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.AnnouncementTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseSectionTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AnnouncementCourseSectionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementCourseSection.class);
        AnnouncementCourseSection announcementCourseSection1 = getAnnouncementCourseSectionSample1();
        AnnouncementCourseSection announcementCourseSection2 = new AnnouncementCourseSection();
        assertThat(announcementCourseSection1).isNotEqualTo(announcementCourseSection2);

        announcementCourseSection2.setId(announcementCourseSection1.getId());
        assertThat(announcementCourseSection1).isEqualTo(announcementCourseSection2);

        announcementCourseSection2 = getAnnouncementCourseSectionSample2();
        assertThat(announcementCourseSection1).isNotEqualTo(announcementCourseSection2);
    }

    @Test
    void announcementTest() {
        AnnouncementCourseSection announcementCourseSection = getAnnouncementCourseSectionRandomSampleGenerator();
        Announcement announcementBack = getAnnouncementRandomSampleGenerator();

        announcementCourseSection.setAnnouncement(announcementBack);
        assertThat(announcementCourseSection.getAnnouncement()).isEqualTo(announcementBack);

        announcementCourseSection.announcement(null);
        assertThat(announcementCourseSection.getAnnouncement()).isNull();
    }

    @Test
    void courseTest() {
        AnnouncementCourseSection announcementCourseSection = getAnnouncementCourseSectionRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        announcementCourseSection.setCourse(courseBack);
        assertThat(announcementCourseSection.getCourse()).isEqualTo(courseBack);

        announcementCourseSection.course(null);
        assertThat(announcementCourseSection.getCourse()).isNull();
    }

    @Test
    void courseSectionTest() {
        AnnouncementCourseSection announcementCourseSection = getAnnouncementCourseSectionRandomSampleGenerator();
        CourseSection courseSectionBack = getCourseSectionRandomSampleGenerator();

        announcementCourseSection.setCourseSection(courseSectionBack);
        assertThat(announcementCourseSection.getCourseSection()).isEqualTo(courseSectionBack);

        announcementCourseSection.courseSection(null);
        assertThat(announcementCourseSection.getCourseSection()).isNull();
    }
}
