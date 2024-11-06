package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class ExamTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Exam getExamSample1() {
        return new Exam().id(1L);
    }

    public static Exam getExamSample2() {
        return new Exam().id(2L);
    }

    public static Exam getExamRandomSampleGenerator() {
        return new Exam().id(longCount.incrementAndGet());
    }
}