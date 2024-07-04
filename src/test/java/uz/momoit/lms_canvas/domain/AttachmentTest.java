package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.LessonMaterialTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AttachmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Attachment.class);
        Attachment attachment1 = getAttachmentSample1();
        Attachment attachment2 = new Attachment();
        assertThat(attachment1).isNotEqualTo(attachment2);

        attachment2.setId(attachment1.getId());
        assertThat(attachment1).isEqualTo(attachment2);

        attachment2 = getAttachmentSample2();
        assertThat(attachment1).isNotEqualTo(attachment2);
    }

    @Test
    void hashCodeVerifier() {
        Attachment attachment = new Attachment();
        assertThat(attachment.hashCode()).isZero();

        Attachment attachment1 = getAttachmentSample1();
        attachment.setId(attachment1.getId());
        assertThat(attachment).hasSameHashCodeAs(attachment1);
    }

    @Test
    void lessonMaterialTest() {
        Attachment attachment = getAttachmentRandomSampleGenerator();
        LessonMaterial lessonMaterialBack = getLessonMaterialRandomSampleGenerator();

        attachment.setLessonMaterial(lessonMaterialBack);
        assertThat(attachment.getLessonMaterial()).isEqualTo(lessonMaterialBack);
        assertThat(lessonMaterialBack.getAttachment()).isEqualTo(attachment);

        attachment.lessonMaterial(null);
        assertThat(attachment.getLessonMaterial()).isNull();
        assertThat(lessonMaterialBack.getAttachment()).isNull();
    }
}
