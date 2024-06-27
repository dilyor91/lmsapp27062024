package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class LessonTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Lesson getLessonSample1() {
        return new Lesson().id(1L).lessonTitle("lessonTitle1").videoUrl("videoUrl1");
    }

    public static Lesson getLessonSample2() {
        return new Lesson().id(2L).lessonTitle("lessonTitle2").videoUrl("videoUrl2");
    }

    public static Lesson getLessonRandomSampleGenerator() {
        return new Lesson()
            .id(longCount.incrementAndGet())
            .lessonTitle(UUID.randomUUID().toString())
            .videoUrl(UUID.randomUUID().toString());
    }
}
