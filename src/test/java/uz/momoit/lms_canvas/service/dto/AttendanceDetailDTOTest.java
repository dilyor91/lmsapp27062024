package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AttendanceDetailDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AttendanceDetailDTO.class);
        AttendanceDetailDTO attendanceDetailDTO1 = new AttendanceDetailDTO();
        attendanceDetailDTO1.setId(1L);
        AttendanceDetailDTO attendanceDetailDTO2 = new AttendanceDetailDTO();
        assertThat(attendanceDetailDTO1).isNotEqualTo(attendanceDetailDTO2);
        attendanceDetailDTO2.setId(attendanceDetailDTO1.getId());
        assertThat(attendanceDetailDTO1).isEqualTo(attendanceDetailDTO2);
        attendanceDetailDTO2.setId(2L);
        assertThat(attendanceDetailDTO1).isNotEqualTo(attendanceDetailDTO2);
        attendanceDetailDTO1.setId(null);
        assertThat(attendanceDetailDTO1).isNotEqualTo(attendanceDetailDTO2);
    }
}
