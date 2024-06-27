package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class StudentAnswerQuestionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static StudentAnswerQuestion getStudentAnswerQuestionSample1() {
        return new StudentAnswerQuestion().id(1L);
    }

    public static StudentAnswerQuestion getStudentAnswerQuestionSample2() {
        return new StudentAnswerQuestion().id(2L);
    }

    public static StudentAnswerQuestion getStudentAnswerQuestionRandomSampleGenerator() {
        return new StudentAnswerQuestion().id(longCount.incrementAndGet());
    }
}
