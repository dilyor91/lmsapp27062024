package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class CommunityAttachmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CommunityAttachment getCommunityAttachmentSample1() {
        return new CommunityAttachment().id(1L);
    }

    public static CommunityAttachment getCommunityAttachmentSample2() {
        return new CommunityAttachment().id(2L);
    }

    public static CommunityAttachment getCommunityAttachmentRandomSampleGenerator() {
        return new CommunityAttachment().id(longCount.incrementAndGet());
    }
}
