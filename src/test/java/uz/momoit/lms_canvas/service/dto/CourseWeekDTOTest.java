package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CourseWeekDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourseWeekDTO.class);
        CourseWeekDTO courseWeekDTO1 = new CourseWeekDTO();
        courseWeekDTO1.setId(1L);
        CourseWeekDTO courseWeekDTO2 = new CourseWeekDTO();
        assertThat(courseWeekDTO1).isNotEqualTo(courseWeekDTO2);
        courseWeekDTO2.setId(courseWeekDTO1.getId());
        assertThat(courseWeekDTO1).isEqualTo(courseWeekDTO2);
        courseWeekDTO2.setId(2L);
        assertThat(courseWeekDTO1).isNotEqualTo(courseWeekDTO2);
        courseWeekDTO1.setId(null);
        assertThat(courseWeekDTO1).isNotEqualTo(courseWeekDTO2);
    }
}
