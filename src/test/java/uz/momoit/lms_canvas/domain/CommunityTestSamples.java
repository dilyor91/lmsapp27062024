package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class CommunityTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Community getCommunitySample1() {
        return new Community().id(1L).title("title1").body("body1");
    }

    public static Community getCommunitySample2() {
        return new Community().id(2L).title("title2").body("body2");
    }

    public static Community getCommunityRandomSampleGenerator() {
        return new Community().id(longCount.incrementAndGet()).title(UUID.randomUUID().toString()).body(UUID.randomUUID().toString());
    }
}
