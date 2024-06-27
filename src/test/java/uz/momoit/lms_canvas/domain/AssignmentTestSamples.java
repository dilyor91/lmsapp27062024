package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class AssignmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Assignment getAssignmentSample1() {
        return new Assignment().id(1L).name("name1").content("content1").allowedAttempts(1);
    }

    public static Assignment getAssignmentSample2() {
        return new Assignment().id(2L).name("name2").content("content2").allowedAttempts(2);
    }

    public static Assignment getAssignmentRandomSampleGenerator() {
        return new Assignment()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .content(UUID.randomUUID().toString())
            .allowedAttempts(intCount.incrementAndGet());
    }
}
