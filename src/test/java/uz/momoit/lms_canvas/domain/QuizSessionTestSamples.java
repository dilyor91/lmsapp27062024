package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class QuizSessionTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static QuizSession getQuizSessionSample1() {
        return new QuizSession().id(1L);
    }

    public static QuizSession getQuizSessionSample2() {
        return new QuizSession().id(2L);
    }

    public static QuizSession getQuizSessionRandomSampleGenerator() {
        return new QuizSession().id(longCount.incrementAndGet());
    }
}
