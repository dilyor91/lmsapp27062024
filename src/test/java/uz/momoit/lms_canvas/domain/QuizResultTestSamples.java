package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class QuizResultTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static QuizResult getQuizResultSample1() {
        return new QuizResult().id(1L).point(1).totalQuestionCnt(1).correctAnswerCnt(1).wrongAnswerCnt(1);
    }

    public static QuizResult getQuizResultSample2() {
        return new QuizResult().id(2L).point(2).totalQuestionCnt(2).correctAnswerCnt(2).wrongAnswerCnt(2);
    }

    public static QuizResult getQuizResultRandomSampleGenerator() {
        return new QuizResult()
            .id(longCount.incrementAndGet())
            .point(intCount.incrementAndGet())
            .totalQuestionCnt(intCount.incrementAndGet())
            .correctAnswerCnt(intCount.incrementAndGet())
            .wrongAnswerCnt(intCount.incrementAndGet());
    }
}
