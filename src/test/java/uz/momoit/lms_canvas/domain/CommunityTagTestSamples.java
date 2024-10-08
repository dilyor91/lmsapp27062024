package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class CommunityTagTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CommunityTag getCommunityTagSample1() {
        return new CommunityTag().id(1L);
    }

    public static CommunityTag getCommunityTagSample2() {
        return new CommunityTag().id(2L);
    }

    public static CommunityTag getCommunityTagRandomSampleGenerator() {
        return new CommunityTag().id(longCount.incrementAndGet());
    }
}
