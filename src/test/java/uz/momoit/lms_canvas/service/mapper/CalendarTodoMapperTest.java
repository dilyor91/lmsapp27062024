package uz.momoit.lms_canvas.service.mapper;

import static uz.momoit.lms_canvas.domain.CalendarTodoAsserts.*;
import static uz.momoit.lms_canvas.domain.CalendarTodoTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CalendarTodoMapperTest {

    private CalendarTodoMapper calendarTodoMapper;

    @BeforeEach
    void setUp() {
        calendarTodoMapper = new CalendarTodoMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getCalendarTodoSample1();
        var actual = calendarTodoMapper.toEntity(calendarTodoMapper.toDto(expected));
        assertCalendarTodoAllPropertiesEquals(expected, actual);
    }
}
