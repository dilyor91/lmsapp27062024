package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AnnouncementTestSamples.*;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AnnouncementTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Announcement.class);
        Announcement announcement1 = getAnnouncementSample1();
        Announcement announcement2 = new Announcement();
        assertThat(announcement1).isNotEqualTo(announcement2);

        announcement2.setId(announcement1.getId());
        assertThat(announcement1).isEqualTo(announcement2);

        announcement2 = getAnnouncementSample2();
        assertThat(announcement1).isNotEqualTo(announcement2);
    }

    @Test
    void attachmentTest() {
        Announcement announcement = getAnnouncementRandomSampleGenerator();
        Attachment attachmentBack = getAttachmentRandomSampleGenerator();

        announcement.setAttachment(attachmentBack);
        assertThat(announcement.getAttachment()).isEqualTo(attachmentBack);

        announcement.attachment(null);
        assertThat(announcement.getAttachment()).isNull();
    }

    @Test
    void courseTest() {
        Announcement announcement = getAnnouncementRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        announcement.setCourse(courseBack);
        assertThat(announcement.getCourse()).isEqualTo(courseBack);

        announcement.course(null);
        assertThat(announcement.getCourse()).isNull();
    }
}
