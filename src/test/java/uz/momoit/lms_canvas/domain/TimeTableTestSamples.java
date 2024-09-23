package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class TimeTableTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static TimeTable getTimeTableSample1() {
        return new TimeTable().id(1L).weekNumber(1).weekDayNumber(1).pairNumber(1);
    }

    public static TimeTable getTimeTableSample2() {
        return new TimeTable().id(2L).weekNumber(2).weekDayNumber(2).pairNumber(2);
    }

    public static TimeTable getTimeTableRandomSampleGenerator() {
        return new TimeTable()
            .id(longCount.incrementAndGet())
            .weekNumber(intCount.incrementAndGet())
            .weekDayNumber(intCount.incrementAndGet())
            .pairNumber(intCount.incrementAndGet());
    }
}
