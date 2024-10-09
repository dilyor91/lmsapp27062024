package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CommunityMessageTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CommunityMessage getCommunityMessageSample1() {
        return new CommunityMessage().id(1L).message("message1");
    }

    public static CommunityMessage getCommunityMessageSample2() {
        return new CommunityMessage().id(2L).message("message2");
    }

    public static CommunityMessage getCommunityMessageRandomSampleGenerator() {
        return new CommunityMessage().id(longCount.incrementAndGet()).message(UUID.randomUUID().toString());
    }
}
