package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AttendanceDetailAsserts.*;
import static uz.momoit.lms_canvas.domain.AttendanceDetailTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AttendanceDetailMapperTest {

    private AttendanceDetailMapper attendanceDetailMapper;

    @BeforeEach
    void setUp() {
        attendanceDetailMapper = new AttendanceDetailMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAttendanceDetailSample1();
        var actual = attendanceDetailMapper.toEntity(attendanceDetailMapper.toDto(expected));
        assertAttendanceDetailAllPropertiesEquals(expected, actual);
    }
}
