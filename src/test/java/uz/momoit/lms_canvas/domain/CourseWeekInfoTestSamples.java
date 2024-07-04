package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class CourseWeekInfoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static CourseWeekInfo getCourseWeekInfoSample1() {
        return new CourseWeekInfo().id(1L).totalWeek(1).lessonPerWeek(1).weekDayCount(1);
    }

    public static CourseWeekInfo getCourseWeekInfoSample2() {
        return new CourseWeekInfo().id(2L).totalWeek(2).lessonPerWeek(2).weekDayCount(2);
    }

    public static CourseWeekInfo getCourseWeekInfoRandomSampleGenerator() {
        return new CourseWeekInfo()
            .id(longCount.incrementAndGet())
            .totalWeek(intCount.incrementAndGet())
            .lessonPerWeek(intCount.incrementAndGet())
            .weekDayCount(intCount.incrementAndGet());
    }
}
