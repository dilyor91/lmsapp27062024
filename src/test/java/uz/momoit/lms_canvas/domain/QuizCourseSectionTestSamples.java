package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class QuizCourseSectionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static QuizCourseSection getQuizCourseSectionSample1() {
        return new QuizCourseSection().id(1L);
    }

    public static QuizCourseSection getQuizCourseSectionSample2() {
        return new QuizCourseSection().id(2L);
    }

    public static QuizCourseSection getQuizCourseSectionRandomSampleGenerator() {
        return new QuizCourseSection().id(longCount.incrementAndGet());
    }
}
