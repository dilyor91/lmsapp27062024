package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class QuizTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Quiz getQuizSample1() {
        return new Quiz().id(1L).quizName("quizName1").timeInMinute(1);
    }

    public static Quiz getQuizSample2() {
        return new Quiz().id(2L).quizName("quizName2").timeInMinute(2);
    }

    public static Quiz getQuizRandomSampleGenerator() {
        return new Quiz().id(longCount.incrementAndGet()).quizName(UUID.randomUUID().toString()).timeInMinute(intCount.incrementAndGet());
    }
}
