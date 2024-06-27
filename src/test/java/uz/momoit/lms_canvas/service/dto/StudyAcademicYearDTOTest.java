package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudyAcademicYearDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyAcademicYearDTO.class);
        StudyAcademicYearDTO studyAcademicYearDTO1 = new StudyAcademicYearDTO();
        studyAcademicYearDTO1.setId(1L);
        StudyAcademicYearDTO studyAcademicYearDTO2 = new StudyAcademicYearDTO();
        assertThat(studyAcademicYearDTO1).isNotEqualTo(studyAcademicYearDTO2);
        studyAcademicYearDTO2.setId(studyAcademicYearDTO1.getId());
        assertThat(studyAcademicYearDTO1).isEqualTo(studyAcademicYearDTO2);
        studyAcademicYearDTO2.setId(2L);
        assertThat(studyAcademicYearDTO1).isNotEqualTo(studyAcademicYearDTO2);
        studyAcademicYearDTO1.setId(null);
        assertThat(studyAcademicYearDTO1).isNotEqualTo(studyAcademicYearDTO2);
    }
}
