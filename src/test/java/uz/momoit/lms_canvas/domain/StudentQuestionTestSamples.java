package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class StudentQuestionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static StudentQuestion getStudentQuestionSample1() {
        return new StudentQuestion().id(1L).ordNum(1);
    }

    public static StudentQuestion getStudentQuestionSample2() {
        return new StudentQuestion().id(2L).ordNum(2);
    }

    public static StudentQuestion getStudentQuestionRandomSampleGenerator() {
        return new StudentQuestion().id(longCount.incrementAndGet()).ordNum(intCount.incrementAndGet());
    }
}
