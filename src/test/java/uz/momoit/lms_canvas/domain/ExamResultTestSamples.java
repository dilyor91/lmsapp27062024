package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class ExamResultTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static ExamResult getExamResultSample1() {
        return new ExamResult().id(1L);
    }

    public static ExamResult getExamResultSample2() {
        return new ExamResult().id(2L);
    }

    public static ExamResult getExamResultRandomSampleGenerator() {
        return new ExamResult().id(longCount.incrementAndGet());
    }
}
