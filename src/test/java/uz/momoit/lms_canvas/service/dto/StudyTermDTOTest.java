package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudyTermDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyTermDTO.class);
        StudyTermDTO studyTermDTO1 = new StudyTermDTO();
        studyTermDTO1.setId(1L);
        StudyTermDTO studyTermDTO2 = new StudyTermDTO();
        assertThat(studyTermDTO1).isNotEqualTo(studyTermDTO2);
        studyTermDTO2.setId(studyTermDTO1.getId());
        assertThat(studyTermDTO1).isEqualTo(studyTermDTO2);
        studyTermDTO2.setId(2L);
        assertThat(studyTermDTO1).isNotEqualTo(studyTermDTO2);
        studyTermDTO1.setId(null);
        assertThat(studyTermDTO1).isNotEqualTo(studyTermDTO2);
    }
}
