package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class ExamResultDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExamResultDTO.class);
        ExamResultDTO examResultDTO1 = new ExamResultDTO();
        examResultDTO1.setId(1L);
        ExamResultDTO examResultDTO2 = new ExamResultDTO();
        assertThat(examResultDTO1).isNotEqualTo(examResultDTO2);
        examResultDTO2.setId(examResultDTO1.getId());
        assertThat(examResultDTO1).isEqualTo(examResultDTO2);
        examResultDTO2.setId(2L);
        assertThat(examResultDTO1).isNotEqualTo(examResultDTO2);
        examResultDTO1.setId(null);
        assertThat(examResultDTO1).isNotEqualTo(examResultDTO2);
    }
}
