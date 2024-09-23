package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class TimeTableDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeTableDTO.class);
        TimeTableDTO timeTableDTO1 = new TimeTableDTO();
        timeTableDTO1.setId(1L);
        TimeTableDTO timeTableDTO2 = new TimeTableDTO();
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
        timeTableDTO2.setId(timeTableDTO1.getId());
        assertThat(timeTableDTO1).isEqualTo(timeTableDTO2);
        timeTableDTO2.setId(2L);
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
        timeTableDTO1.setId(null);
        assertThat(timeTableDTO1).isNotEqualTo(timeTableDTO2);
    }
}
