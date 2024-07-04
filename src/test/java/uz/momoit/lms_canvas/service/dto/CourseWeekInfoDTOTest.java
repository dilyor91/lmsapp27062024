package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseWeekInfoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseWeekInfoDTO.class);
        CourseWeekInfoDTO courseWeekInfoDTO1 = new CourseWeekInfoDTO();
        courseWeekInfoDTO1.setId(1L);
        CourseWeekInfoDTO courseWeekInfoDTO2 = new CourseWeekInfoDTO();
        assertThat(courseWeekInfoDTO1).isNotEqualTo(courseWeekInfoDTO2);
        courseWeekInfoDTO2.setId(courseWeekInfoDTO1.getId());
        assertThat(courseWeekInfoDTO1).isEqualTo(courseWeekInfoDTO2);
        courseWeekInfoDTO2.setId(2L);
        assertThat(courseWeekInfoDTO1).isNotEqualTo(courseWeekInfoDTO2);
        courseWeekInfoDTO1.setId(null);
        assertThat(courseWeekInfoDTO1).isNotEqualTo(courseWeekInfoDTO2);
    }
}
