package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CourseWeekTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CourseWeek getCourseWeekSample1() {
        return new CourseWeek().id(1L).name("name1");
    }

    public static CourseWeek getCourseWeekSample2() {
        return new CourseWeek().id(2L).name("name2");
    }

    public static CourseWeek getCourseWeekRandomSampleGenerator() {
        return new CourseWeek().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
