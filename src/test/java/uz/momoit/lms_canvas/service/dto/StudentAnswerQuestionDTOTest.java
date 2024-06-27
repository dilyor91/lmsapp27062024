package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentAnswerQuestionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentAnswerQuestionDTO.class);
        StudentAnswerQuestionDTO studentAnswerQuestionDTO1 = new StudentAnswerQuestionDTO();
        studentAnswerQuestionDTO1.setId(1L);
        StudentAnswerQuestionDTO studentAnswerQuestionDTO2 = new StudentAnswerQuestionDTO();
        assertThat(studentAnswerQuestionDTO1).isNotEqualTo(studentAnswerQuestionDTO2);
        studentAnswerQuestionDTO2.setId(studentAnswerQuestionDTO1.getId());
        assertThat(studentAnswerQuestionDTO1).isEqualTo(studentAnswerQuestionDTO2);
        studentAnswerQuestionDTO2.setId(2L);
        assertThat(studentAnswerQuestionDTO1).isNotEqualTo(studentAnswerQuestionDTO2);
        studentAnswerQuestionDTO1.setId(null);
        assertThat(studentAnswerQuestionDTO1).isNotEqualTo(studentAnswerQuestionDTO2);
    }
}
