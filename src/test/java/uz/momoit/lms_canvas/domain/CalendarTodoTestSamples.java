package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CalendarTodoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CalendarTodo getCalendarTodoSample1() {
        return new CalendarTodo().id(1L).title("title1").time("time1").details("details1");
    }

    public static CalendarTodo getCalendarTodoSample2() {
        return new CalendarTodo().id(2L).title("title2").time("time2").details("details2");
    }

    public static CalendarTodo getCalendarTodoRandomSampleGenerator() {
        return new CalendarTodo()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .time(UUID.randomUUID().toString())
            .details(UUID.randomUUID().toString());
    }
}
