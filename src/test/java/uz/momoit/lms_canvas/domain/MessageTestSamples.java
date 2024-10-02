package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class MessageTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Message getMessageSample1() {
        return new Message().id(1L).subject("subject1").body("body1").toSectionIds("toSectionIds1");
    }

    public static Message getMessageSample2() {
        return new Message().id(2L).subject("subject2").body("body2").toSectionIds("toSectionIds2");
    }

    public static Message getMessageRandomSampleGenerator() {
        return new Message()
            .id(longCount.incrementAndGet())
            .subject(UUID.randomUUID().toString())
            .body(UUID.randomUUID().toString())
            .toSectionIds(UUID.randomUUID().toString());
    }
}
