package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class QuestionGroupTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static QuestionGroup getQuestionGroupSample1() {
        return new QuestionGroup().id(1L).name("name1");
    }

    public static QuestionGroup getQuestionGroupSample2() {
        return new QuestionGroup().id(2L).name("name2");
    }

    public static QuestionGroup getQuestionGroupRandomSampleGenerator() {
        return new QuestionGroup().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
