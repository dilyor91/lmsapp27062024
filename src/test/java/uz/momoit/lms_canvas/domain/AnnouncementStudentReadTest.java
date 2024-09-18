package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AnnouncementStudentReadTestSamples.*;
import static uz.momoit.lms_canvas.domain.AnnouncementTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AnnouncementStudentReadTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementStudentRead.class);
        AnnouncementStudentRead announcementStudentRead1 = getAnnouncementStudentReadSample1();
        AnnouncementStudentRead announcementStudentRead2 = new AnnouncementStudentRead();
        assertThat(announcementStudentRead1).isNotEqualTo(announcementStudentRead2);

        announcementStudentRead2.setId(announcementStudentRead1.getId());
        assertThat(announcementStudentRead1).isEqualTo(announcementStudentRead2);

        announcementStudentRead2 = getAnnouncementStudentReadSample2();
        assertThat(announcementStudentRead1).isNotEqualTo(announcementStudentRead2);
    }

    @Test
    void announcementTest() {
        AnnouncementStudentRead announcementStudentRead = getAnnouncementStudentReadRandomSampleGenerator();
        Announcement announcementBack = getAnnouncementRandomSampleGenerator();

        announcementStudentRead.setAnnouncement(announcementBack);
        assertThat(announcementStudentRead.getAnnouncement()).isEqualTo(announcementBack);

        announcementStudentRead.announcement(null);
        assertThat(announcementStudentRead.getAnnouncement()).isNull();
    }

    @Test
    void studentTest() {
        AnnouncementStudentRead announcementStudentRead = getAnnouncementStudentReadRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        announcementStudentRead.setStudent(studentBack);
        assertThat(announcementStudentRead.getStudent()).isEqualTo(studentBack);

        announcementStudentRead.student(null);
        assertThat(announcementStudentRead.getStudent()).isNull();
    }
}
