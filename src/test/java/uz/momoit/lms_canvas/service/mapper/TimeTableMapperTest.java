package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.TimeTableAsserts.*;
import static uz.momoit.lms_canvas.domain.TimeTableTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class TimeTableMapperTest {

    private TimeTableMapper timeTableMapper;

    @BeforeEach
    void setUp() {
        timeTableMapper = new TimeTableMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getTimeTableSample1();
        var actual = timeTableMapper.toEntity(timeTableMapper.toDto(expected));
        assertTimeTableAllPropertiesEquals(expected, actual);
    }
}
