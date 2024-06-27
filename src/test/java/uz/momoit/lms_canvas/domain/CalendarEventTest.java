package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.CalendarEventTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class CalendarEventTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CalendarEvent.class);
        CalendarEvent calendarEvent1 = getCalendarEventSample1();
        CalendarEvent calendarEvent2 = new CalendarEvent();
        assertThat(calendarEvent1).isNotEqualTo(calendarEvent2);

        calendarEvent2.setId(calendarEvent1.getId());
        assertThat(calendarEvent1).isEqualTo(calendarEvent2);

        calendarEvent2 = getCalendarEventSample2();
        assertThat(calendarEvent1).isNotEqualTo(calendarEvent2);
    }
}
