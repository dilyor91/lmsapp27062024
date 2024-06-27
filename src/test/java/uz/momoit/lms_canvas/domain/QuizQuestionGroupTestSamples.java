package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class QuizQuestionGroupTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static QuizQuestionGroup getQuizQuestionGroupSample1() {
        return new QuizQuestionGroup().id(1L).questionCount(1);
    }

    public static QuizQuestionGroup getQuizQuestionGroupSample2() {
        return new QuizQuestionGroup().id(2L).questionCount(2);
    }

    public static QuizQuestionGroup getQuizQuestionGroupRandomSampleGenerator() {
        return new QuizQuestionGroup().id(longCount.incrementAndGet()).questionCount(intCount.incrementAndGet());
    }
}
