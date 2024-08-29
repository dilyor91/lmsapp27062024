package uz.momoit.lms_canvas.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CalendarTodoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CalendarTodoDTO.class);
        CalendarTodoDTO calendarTodoDTO1 = new CalendarTodoDTO();
        calendarTodoDTO1.setId(1L);
        CalendarTodoDTO calendarTodoDTO2 = new CalendarTodoDTO();
        assertThat(calendarTodoDTO1).isNotEqualTo(calendarTodoDTO2);
        calendarTodoDTO2.setId(calendarTodoDTO1.getId());
        assertThat(calendarTodoDTO1).isEqualTo(calendarTodoDTO2);
        calendarTodoDTO2.setId(2L);
        assertThat(calendarTodoDTO1).isNotEqualTo(calendarTodoDTO2);
        calendarTodoDTO1.setId(null);
        assertThat(calendarTodoDTO1).isNotEqualTo(calendarTodoDTO2);
    }
}
