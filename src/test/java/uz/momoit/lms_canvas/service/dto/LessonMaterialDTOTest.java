package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class LessonMaterialDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LessonMaterialDTO.class);
        LessonMaterialDTO lessonMaterialDTO1 = new LessonMaterialDTO();
        lessonMaterialDTO1.setId(1L);
        LessonMaterialDTO lessonMaterialDTO2 = new LessonMaterialDTO();
        assertThat(lessonMaterialDTO1).isNotEqualTo(lessonMaterialDTO2);
        lessonMaterialDTO2.setId(lessonMaterialDTO1.getId());
        assertThat(lessonMaterialDTO1).isEqualTo(lessonMaterialDTO2);
        lessonMaterialDTO2.setId(2L);
        assertThat(lessonMaterialDTO1).isNotEqualTo(lessonMaterialDTO2);
        lessonMaterialDTO1.setId(null);
        assertThat(lessonMaterialDTO1).isNotEqualTo(lessonMaterialDTO2);
    }
}
