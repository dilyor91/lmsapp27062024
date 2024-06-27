package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CalendarEventAsserts.*;
import static uz.momoit.lms_canvas.domain.CalendarEventTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CalendarEventMapperTest {

    private CalendarEventMapper calendarEventMapper;

    @BeforeEach
    void setUp() {
        calendarEventMapper = new CalendarEventMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCalendarEventSample1();
        var actual = calendarEventMapper.toEntity(calendarEventMapper.toDto(expected));
        assertCalendarEventAllPropertiesEquals(expected, actual);
    }
}
