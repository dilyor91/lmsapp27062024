package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.LessonMaterialTestSamples.*;
import static uz.momoit.lms_canvas.domain.LessonTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class LessonMaterialTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LessonMaterial.class);
        LessonMaterial lessonMaterial1 = getLessonMaterialSample1();
        LessonMaterial lessonMaterial2 = new LessonMaterial();
        assertThat(lessonMaterial1).isNotEqualTo(lessonMaterial2);

        lessonMaterial2.setId(lessonMaterial1.getId());
        assertThat(lessonMaterial1).isEqualTo(lessonMaterial2);

        lessonMaterial2 = getLessonMaterialSample2();
        assertThat(lessonMaterial1).isNotEqualTo(lessonMaterial2);
    }

    @Test
    void attachmentTest() {
        LessonMaterial lessonMaterial = getLessonMaterialRandomSampleGenerator();
        Attachment attachmentBack = getAttachmentRandomSampleGenerator();

        lessonMaterial.setAttachment(attachmentBack);
        assertThat(lessonMaterial.getAttachment()).isEqualTo(attachmentBack);

        lessonMaterial.attachment(null);
        assertThat(lessonMaterial.getAttachment()).isNull();
    }

    @Test
    void lessonTest() {
        LessonMaterial lessonMaterial = getLessonMaterialRandomSampleGenerator();
        Lesson lessonBack = getLessonRandomSampleGenerator();

        lessonMaterial.setLesson(lessonBack);
        assertThat(lessonMaterial.getLesson()).isEqualTo(lessonBack);

        lessonMaterial.lesson(null);
        assertThat(lessonMaterial.getLesson()).isNull();
    }
}
