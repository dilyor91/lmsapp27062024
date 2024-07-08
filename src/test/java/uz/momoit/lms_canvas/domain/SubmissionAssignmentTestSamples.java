package uz.momoit.lms_canvas.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class SubmissionAssignmentTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static SubmissionAssignment getSubmissionAssignmentSample1() {
        return new SubmissionAssignment().id(1L).content("content1").comment("comment1").attempsNumber(1);
    }

    public static SubmissionAssignment getSubmissionAssignmentSample2() {
        return new SubmissionAssignment().id(2L).content("content2").comment("comment2").attempsNumber(2);
    }

    public static SubmissionAssignment getSubmissionAssignmentRandomSampleGenerator() {
        return new SubmissionAssignment()
            .id(longCount.incrementAndGet())
            .content(UUID.randomUUID().toString())
            .comment(UUID.randomUUID().toString())
            .attempsNumber(intCount.incrementAndGet());
    }
}
