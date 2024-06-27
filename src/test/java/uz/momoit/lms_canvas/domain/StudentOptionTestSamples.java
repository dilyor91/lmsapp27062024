package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StudentOptionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static StudentOption getStudentOptionSample1() {
        return new StudentOption().id(1L).ordNum(1);
    }

    public static StudentOption getStudentOptionSample2() {
        return new StudentOption().id(2L).ordNum(2);
    }

    public static StudentOption getStudentOptionRandomSampleGenerator() {
        return new StudentOption().id(longCount.incrementAndGet()).ordNum(intCount.incrementAndGet());
    }
}
