package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class MessageAttachmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static MessageAttachment getMessageAttachmentSample1() {
        return new MessageAttachment().id(1L);
    }

    public static MessageAttachment getMessageAttachmentSample2() {
        return new MessageAttachment().id(2L);
    }

    public static MessageAttachment getMessageAttachmentRandomSampleGenerator() {
        return new MessageAttachment().id(longCount.incrementAndGet());
    }
}
