package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentQuestionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentQuestionDTO.class);
        StudentQuestionDTO studentQuestionDTO1 = new StudentQuestionDTO();
        studentQuestionDTO1.setId(1L);
        StudentQuestionDTO studentQuestionDTO2 = new StudentQuestionDTO();
        assertThat(studentQuestionDTO1).isNotEqualTo(studentQuestionDTO2);
        studentQuestionDTO2.setId(studentQuestionDTO1.getId());
        assertThat(studentQuestionDTO1).isEqualTo(studentQuestionDTO2);
        studentQuestionDTO2.setId(2L);
        assertThat(studentQuestionDTO1).isNotEqualTo(studentQuestionDTO2);
        studentQuestionDTO1.setId(null);
        assertThat(studentQuestionDTO1).isNotEqualTo(studentQuestionDTO2);
    }
}
