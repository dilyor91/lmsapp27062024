package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class CommunityCourseTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static CommunityCourse getCommunityCourseSample1() {
        return new CommunityCourse().id(1L);
    }

    public static CommunityCourse getCommunityCourseSample2() {
        return new CommunityCourse().id(2L);
    }

    public static CommunityCourse getCommunityCourseRandomSampleGenerator() {
        return new CommunityCourse().id(longCount.incrementAndGet());
    }
}
