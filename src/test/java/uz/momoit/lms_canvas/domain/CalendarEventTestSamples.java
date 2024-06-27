package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class CalendarEventTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static CalendarEvent getCalendarEventSample1() {
        return new CalendarEvent()
            .id(1L)
            .title("title1")
            .content("content1")
            .startTime(1)
            .endTime(1)
            .location("location1")
            .address("address1");
    }

    public static CalendarEvent getCalendarEventSample2() {
        return new CalendarEvent()
            .id(2L)
            .title("title2")
            .content("content2")
            .startTime(2)
            .endTime(2)
            .location("location2")
            .address("address2");
    }

    public static CalendarEvent getCalendarEventRandomSampleGenerator() {
        return new CalendarEvent()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .content(UUID.randomUUID().toString())
            .startTime(intCount.incrementAndGet())
            .endTime(intCount.incrementAndGet())
            .location(UUID.randomUUID().toString())
            .address(UUID.randomUUID().toString());
    }
}
