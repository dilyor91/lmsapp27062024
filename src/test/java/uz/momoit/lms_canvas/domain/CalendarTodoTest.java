package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CalendarTodoTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CalendarTodoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CalendarTodo.class);
        CalendarTodo calendarTodo1 = getCalendarTodoSample1();
        CalendarTodo calendarTodo2 = new CalendarTodo();
        assertThat(calendarTodo1).isNotEqualTo(calendarTodo2);

        calendarTodo2.setId(calendarTodo1.getId());
        assertThat(calendarTodo1).isEqualTo(calendarTodo2);

        calendarTodo2 = getCalendarTodoSample2();
        assertThat(calendarTodo1).isNotEqualTo(calendarTodo2);
    }
}
