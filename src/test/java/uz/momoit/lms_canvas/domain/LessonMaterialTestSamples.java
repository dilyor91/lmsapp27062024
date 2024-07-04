package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class LessonMaterialTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static LessonMaterial getLessonMaterialSample1() {
        return new LessonMaterial().id(1L).title("title1").description("description1");
    }

    public static LessonMaterial getLessonMaterialSample2() {
        return new LessonMaterial().id(2L).title("title2").description("description2");
    }

    public static LessonMaterial getLessonMaterialRandomSampleGenerator() {
        return new LessonMaterial()
            .id(longCount.incrementAndGet())
            .title(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
