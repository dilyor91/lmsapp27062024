package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentOptionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentOptionDTO.class);
        StudentOptionDTO studentOptionDTO1 = new StudentOptionDTO();
        studentOptionDTO1.setId(1L);
        StudentOptionDTO studentOptionDTO2 = new StudentOptionDTO();
        assertThat(studentOptionDTO1).isNotEqualTo(studentOptionDTO2);
        studentOptionDTO2.setId(studentOptionDTO1.getId());
        assertThat(studentOptionDTO1).isEqualTo(studentOptionDTO2);
        studentOptionDTO2.setId(2L);
        assertThat(studentOptionDTO1).isNotEqualTo(studentOptionDTO2);
        studentOptionDTO1.setId(null);
        assertThat(studentOptionDTO1).isNotEqualTo(studentOptionDTO2);
    }
}
