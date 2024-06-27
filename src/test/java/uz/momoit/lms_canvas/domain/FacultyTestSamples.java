package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FacultyTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Faculty getFacultySample1() {
        return new Faculty().id(1L).name("name1");
    }

    public static Faculty getFacultySample2() {
        return new Faculty().id(2L).name("name2");
    }

    public static Faculty getFacultyRandomSampleGenerator() {
        return new Faculty().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
