package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AttendanceDetailTestSamples.*;
import static uz.momoit.lms_canvas.domain.AttendanceTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AttendanceDetailTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AttendanceDetail.class);
        AttendanceDetail attendanceDetail1 = getAttendanceDetailSample1();
        AttendanceDetail attendanceDetail2 = new AttendanceDetail();
        assertThat(attendanceDetail1).isNotEqualTo(attendanceDetail2);

        attendanceDetail2.setId(attendanceDetail1.getId());
        assertThat(attendanceDetail1).isEqualTo(attendanceDetail2);

        attendanceDetail2 = getAttendanceDetailSample2();
        assertThat(attendanceDetail1).isNotEqualTo(attendanceDetail2);
    }

    @Test
    void attendanceTest() {
        AttendanceDetail attendanceDetail = getAttendanceDetailRandomSampleGenerator();
        Attendance attendanceBack = getAttendanceRandomSampleGenerator();

        attendanceDetail.setAttendance(attendanceBack);
        assertThat(attendanceDetail.getAttendance()).isEqualTo(attendanceBack);

        attendanceDetail.attendance(null);
        assertThat(attendanceDetail.getAttendance()).isNull();
    }
}
