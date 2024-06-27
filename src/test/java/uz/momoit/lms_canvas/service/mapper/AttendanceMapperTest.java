package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.AttendanceAsserts.*;
import static uz.momoit.lms_canvas.domain.AttendanceTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AttendanceMapperTest {

    private AttendanceMapper attendanceMapper;

    @BeforeEach
    void setUp() {
        attendanceMapper = new AttendanceMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAttendanceSample1();
        var actual = attendanceMapper.toEntity(attendanceMapper.toDto(expected));
        assertAttendanceAllPropertiesEquals(expected, actual);
    }
}
