package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class MessageToUserTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MessageToUser getMessageToUserSample1() {
        return new MessageToUser().id(1L);
    }

    public static MessageToUser getMessageToUserSample2() {
        return new MessageToUser().id(2L);
    }

    public static MessageToUser getMessageToUserRandomSampleGenerator() {
        return new MessageToUser().id(longCount.incrementAndGet());
    }
}
